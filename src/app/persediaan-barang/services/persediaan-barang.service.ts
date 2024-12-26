import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { PersediaanBarangRepository } from '../repositories';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../dtos';
import { FilterPersediaanBarangDTO } from '../dtos/filter-persediaan-barang.dto';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { DateTime } from 'luxon';
import { TransaksiBarangDTO } from '../dtos/transaksi.dto';
import { FilterTransaksiBarangDTO } from '../dtos/filter-transaksi-barang.dto';
import { CreateJournalDetailDto, CreateJournalDto } from '@app/journal/dtos';
import { JournalService } from '@app/journal/services';
@Injectable()
export class PersediaanBarangService {
  constructor(
    private readonly persediaanBarangRepo: PersediaanBarangRepository,
    private readonly prismaService: PrismaService,
    private readonly journalService: JournalService,
  ) {}

  paginate(
    paginateDto: FilterPersediaanBarangDTO,
    cageId: string,
    siteId: string,
  ) {
    return from(
      this.persediaanBarangRepo.paginate(paginateDto, {
        where: {
          cageId: cageId,
          siteId,
        },
      }),
    );
  }

  detail(id: string) {
    return from(
      this.persediaanBarangRepo.firstOrThrow(
        { id },
        {
          id: true,
          qty: true,
          cageId: true,
          siteId: true,
          harga: true,
          total: true,
          status: true,
          goodsId: true,
          goods: {
            select: {
              id: true,
              name: true,
              type: true,
            },
          },
        },
      ),
    );
  }

  async update(
    id: string,
    payload: UpdatePersediaanBarangDTO,
    user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    try {
      const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
      await this.prismaService.persediaanPakanObat.update({
        where: {
          id: id,
        },
        data: {
          qty: payload.qty,
          cageId: payload.cageId,
          siteId: payload.siteId,
          harga: payload.harga,
          total: payload.harga! * payload.qty!,
          status: 1,
          goodsId: payload.goodId,
        },
      });
      const kartuStok = await this.prismaService.kartuStokBarang.create({
        data: {
          barangId: id,
          cageId: payload.cageId!,
          siteId: payload.siteId!,
          qtyAsal: payload.qty!,
          qtyIn: 0,
          qtyAkhir: payload.qty!,
          qtyOut: 0,
          keterangan: 'Create Barang',
          karyawanId: user.id,
          tanggal: currentDate,
          harga: payload.harga!,
          total: payload.qty! * payload.harga!,
          status: 1,
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Success create persediaan barang',
        data: kartuStok,
      };
    } catch (e) {
      throw new HttpException(
        'Failed to update persediaan barang',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  destroy(id: string) {
    return from(this.persediaanBarangRepo.delete({ id }));
  }

  async create(
    payload: CreatePersediaanBarang,
    user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    try {
      const journalTemplate =
        await this.prismaService.journalTemplate.findFirst({
          where: { jurnalTypeId: payload.journalTypeId },
          include: {
            journalTemplateDetails: {
              where: { deletedAt: null },
              select: {
                id: true,
                typeLedger: true,
                status: true,
                coa: { select: { code: true, name: true } },
              },
            },
          },
        });

      if (journalTemplate) {
        const multiplier = payload.qty * payload.harga;

        const createJournalDetails: CreateJournalDetailDto[] =
          journalTemplate.journalTemplateDetails.map((detail: any) => ({
            coaCode: detail.coa.code,
            credit: detail.typeLedger === 'CREDIT' ? multiplier : 0,
            debit: detail.typeLedger === 'DEBIT' ? multiplier : 0,
            note: `Persedian Barang - ${detail.coa.name}`,
          }));

        const countJournal = await this.prismaService.journalHeader.count();

        const journalSell: CreateJournalDto = {
          code: `JN-${DateTime.now().toFormat('yy-MM')}-${countJournal + 1}`, // Unique code
          // date: new Date().toISOString(), format 2024-12-10 just date yyyy-mm-dd
          date: DateTime.now().toFormat('yyyy-MM-dd'),
          debtTotal: createJournalDetails.reduce(
            (acc, item) => acc + item.debit,
            0,
          ),
          creditTotal: createJournalDetails.reduce(
            (acc, item) => acc + item.credit,
            0,
          ),
          status: '1',
          journalTypeId: payload.journalTypeId as string,
          cageId: payload.cageId,
          siteId: payload.siteId,
          details: createJournalDetails,
        };

        from(this.journalService.create(journalSell, user.id)).subscribe();
      }

      const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
      const save = await this.prismaService.persediaanPakanObat.create({
        data: {
          qty: payload.qty,
          cageId: payload.cageId,
          siteId: payload.siteId,
          harga: payload.harga,
          total: payload.harga * payload.qty,
          status: 1,
          goodsId: payload.goodId,
        },
      });

      // Save ke kartustok
      const kartuStok = await this.prismaService.kartuStokBarang.create({
        data: {
          barangId: save.id,
          cageId: payload.cageId,
          siteId: payload.siteId,
          batchId: payload.batchId,
          qtyAsal: 0,
          qtyIn: payload.qty,
          qtyAkhir: payload.qty,
          qtyOut: 0,
          keterangan: 'Create Barang',
          karyawanId: user.id,
          tanggal: currentDate,
          harga: payload.harga,
          total: payload.qty * payload.harga,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Success create persediaan barang',
        data: {
          barang: save,
          stok: kartuStok,
        },
      };
    } catch (e) {
      throw new HttpException(
        'Failed to create persediaan barang',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async submitTransaksi(
    body: TransaksiBarangDTO,
    user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const barang = await this.prismaService.persediaanPakanObat.findFirst({
      where: {
        id: body.barangId,
      },
    });
    if (!barang) {
      throw new HttpException(
        'Failed to save transaction, barang tidak ditemukan',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      if (body.tipe == 'in') {
        await this.prismaService.kartuStokBarang.create({
          data: {
            tanggal: currentDate,
            barangId: barang.id,
            cageId: body.cageId,
            siteId: body.siteId,
            qtyAsal: barang.qty,
            qtyIn: body.qty,
            qtyOut: 0,
            qtyAkhir: barang.qty + body.qty,
            harga: barang.harga,
            total: barang.harga * body.qty,
            karyawanId: user.id,
            keterangan: body.keterangan,
            status: 1,
          },
        });
        // Update stok
        await this.prismaService.persediaanPakanObat.update({
          where: { id: barang.id },
          data: {
            qty: barang.qty + body.qty,
          },
        });
      } else {
        await this.prismaService.kartuStokBarang.create({
          data: {
            tanggal: currentDate,
            barangId: barang.id,
            cageId: body.cageId,
            siteId: body.siteId,
            qtyAsal: barang.qty,
            qtyIn: 0,
            qtyOut: body.qty,
            qtyAkhir: barang.qty - body.qty,
            harga: barang.harga,
            total: barang.harga * body.qty,
            karyawanId: user.id,
            keterangan: body.keterangan,
            status: 0,
          },
        });

        await this.prismaService.persediaanPakanObat.update({
          where: { id: barang.id },
          data: {
            qty: barang.qty - body.qty,
          },
        });
      }
      return {
        status: HttpStatus.OK,
        message: 'Success save transaction',
        data: [],
      };
    } catch (e) {
      throw new HttpException(
        'Failed to submit data transaksi',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  paginateTransaksi(paginateDto: FilterTransaksiBarangDTO) {
    return from(this.persediaanBarangRepo.paginateTransaksi(paginateDto));
  }
}
