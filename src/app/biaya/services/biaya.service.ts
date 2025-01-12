import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { BiayaRepository } from '../repositories';
import { CreateBiayaDTO, UpdateBiayaDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { DateTime } from 'luxon';
import { JournalService } from '@app/journal/services';
import { JournalTemplatesService } from '@app/journal-templates/services';
import { CreateJournalDetailDto, CreateJournalDto } from '@app/journal/dtos';

@Injectable()
export class BiayaService {
  constructor(
    private readonly biayaRepository: BiayaRepository,
    private readonly journalService: JournalService,
    private readonly journalTemplatesService: JournalTemplatesService,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: PaginationQueryDto, siteId: string) {
    return from(
      this.biayaRepository.paginate(paginateDto, {
        where: { siteId },
        include: {
          batch: true,
        },
      }),
    );
  }

  detail(id: string) {
    return from(this.biayaRepository.firstOrThrow({ id }));
  }

  update(id: string, UpdateBiayaDTO: UpdateBiayaDTO) {
    return from(this.biayaRepository.update({ id }, UpdateBiayaDTO));
  }

  destroy(id: string) {
    return from(this.biayaRepository.delete({ id }));
  }

  create(payload: CreateBiayaDTO): Observable<any> {
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const qtyOut = Number(payload.qty ?? '0');

    const dateCreated = new Date(
      new Date(payload.tanggal).setHours(
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
        new Date().getMilliseconds(),
      ),
    ).toISOString();

    return from(
      this.journalTemplatesService.findFirstByJournalTypeId(
        payload.journalTypeId,
      ),
    ).pipe(
      switchMap((journalTemplate) => {
        if (!journalTemplate)
          return throwError(() => new Error('Journal template not found'));

        if (payload.persediaanBarangId) {
          return from(
            this.prismaService.persediaanPakanObat.findFirst({
              where: { id: payload.persediaanBarangId },
              include: { goods: true },
            }),
          ).pipe(
            switchMap((barang) => {
              if (!barang)
                return throwError(() => new Error('Inventory not found'));

              const totalBiaya = payload.biaya ?? 0;
              const typeGood = barang.goods?.type?.toLowerCase() ?? 'pakan';

              const ledgerCounts =
                journalTemplate.journalTemplateDetails.reduce(
                  (acc, detail) => {
                    acc[detail.typeLedger] = (acc[detail.typeLedger] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>,
                );

              const details: CreateJournalDetailDto[] =
                journalTemplate.journalTemplateDetails.map((detail) => {
                  const isRelevant = detail.coa.name
                    .toLowerCase()
                    .includes(typeGood);
                  const nominal =
                    ledgerCounts[detail.typeLedger] === 1
                      ? totalBiaya
                      : ledgerCounts[detail.typeLedger] > 1 && isRelevant
                        ? totalBiaya
                        : 0;

                  return {
                    coaCode: detail.coa.code,
                    debit: detail.typeLedger === 'DEBIT' ? nominal : 0,
                    credit: detail.typeLedger === 'CREDIT' ? nominal : 0,
                    note: `
                      Biaya: ${barang.goods?.name ?? 'Lainnya'} - ${detail.coa.name} - ${payload.keterangan}
                    `,
                    createdAt: dateCreated,
                    updatedAt: dateCreated,
                  };
                });

              const journalDto: CreateJournalDto = {
                code: `JN-${DateTime.now().toFormat('yy-MM')}-${Math.floor(Math.random() * 1000) + 1}`,
                date: payload.tanggal,
                debtTotal: details.reduce((acc, curr) => acc + curr.debit, 0),
                creditTotal: details.reduce(
                  (acc, curr) => acc + curr.credit,
                  0,
                ),
                batchId: payload.batchId,
                status: '1',
                journalTypeId: payload.journalTypeId,
                cageId: payload.cageId,
                siteId: payload.siteId,
                createdAt: dateCreated,
                updatedAt: dateCreated,
                details,
              };

              const qtyAkhir = barang.qty - qtyOut;
              const totalHarga = barang.harga * qtyOut;

              return this.journalService
                .create(journalDto, payload.userId)
                .pipe(
                  switchMap((journal) => {
                    if (!journal)
                      return throwError(
                        () => new Error('Failed to create journal entry'),
                      );

                    return from(
                      this.prismaService.kartuStokBarang
                        .create({
                          data: {
                            tanggal: currentDate,
                            barangId: barang.id,
                            cageId: payload.cageId,
                            siteId: payload.siteId,
                            batchId: payload.batchId,
                            qtyAsal: barang.qty,
                            qtyIn: 0,
                            qtyOut,
                            qtyAkhir,
                            harga: barang.harga,
                            total: totalHarga,
                            karyawanId: payload.userId,
                            keterangan: payload.keterangan,
                            status: 0,
                            createdAt: dateCreated,
                            updatedAt: dateCreated,
                          },
                        })
                        .then(() =>
                          this.prismaService.persediaanPakanObat.update({
                            where: { id: barang.id },
                            data: { qty: qtyAkhir, updatedAt: dateCreated },
                          }),
                        ),
                    );
                  }),
                  switchMap(() =>
                    this.prismaService.biaya.create({
                      data: {
                        tanggal: payload.tanggal,
                        kategoriBiaya: {
                          connect: { id: payload.kategoriId },
                        },
                        cage: { connect: { id: payload.cageId } },
                        site: { connect: { id: payload.siteId } },
                        persediaanPakanObat: {
                          connect: { id: payload.persediaanBarangId },
                        },
                        user: { connect: { id: payload.userId } },
                        qtyOut,
                        batch: { connect: { id: payload.batchId } },
                        biaya: payload.biaya ?? 0,
                        status: payload.status,
                        keterangan: payload.keterangan,
                        createdAt: dateCreated,
                        updatedAt: dateCreated,
                      },
                    }),
                  ),
                );
            }),
          );
        } else {
          const details: CreateJournalDetailDto[] =
            journalTemplate.journalTemplateDetails.map((detail) => {
              const nominal = payload.biaya ?? 0;
              return {
                coaCode: detail.coa.code,
                debit: detail.typeLedger === 'DEBIT' ? nominal : 0,
                credit: detail.typeLedger === 'CREDIT' ? nominal : 0,
                note: `Biaya (Batch: ${payload.batchId ?? 'N/A'}) - ${detail.coa.name} - ${payload.keterangan}`,
                createdAt: dateCreated,
                updatedAt: dateCreated,
              };
            });

          const journalDto: CreateJournalDto = {
            code: `JN-${DateTime.now().toFormat('yy-MM')}-${Math.floor(Math.random() * 1000) + 1}`,
            date: payload.tanggal,
            debtTotal: details.reduce((acc, curr) => acc + curr.debit, 0),
            creditTotal: details.reduce((acc, curr) => acc + curr.credit, 0),
            batchId: payload.batchId,
            status: '1',
            journalTypeId: payload.journalTypeId,
            cageId: payload.cageId,
            siteId: payload.siteId,
            createdAt: dateCreated,
            updatedAt: dateCreated,
            details,
          };

          return this.journalService.create(journalDto, payload.userId).pipe(
            switchMap(() =>
              this.prismaService.biaya.create({
                data: {
                  tanggal: payload.tanggal,
                  kategoriBiaya: {
                    connect: { id: payload.kategoriId },
                  },
                  cage: { connect: { id: payload.cageId } },
                  site: { connect: { id: payload.siteId } },
                  user: { connect: { id: payload.userId } },
                  qtyOut,
                  batch: { connect: { id: payload.batchId } },
                  biaya: payload.biaya ?? 0,
                  status: payload.status,
                  keterangan: payload.keterangan,
                  createdAt: dateCreated,
                  updatedAt: dateCreated,
                },
              }),
            ),
          );
        }
      }),
      catchError((err) => {
        console.error('Error while creating biaya:', err.message);
        return throwError(
          () =>
            new HttpException(
              'Gagal membuat biaya, ' + err.message,
              HttpStatus.BAD_REQUEST,
            ),
        );
      }),
    );
  }
}
