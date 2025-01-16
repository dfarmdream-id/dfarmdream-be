import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { BiayaRepository } from '../repositories';
import { CreateBiayaDTO, UpdateBiayaDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { DateTime } from 'luxon';
import { JournalService } from '@app/journal/services';
import { JournalTemplatesService } from '@app/journal-templates/services';
import { CreateJournalDetailDto, CreateJournalDto } from '@app/journal/dtos';
import { FilterBiayaDto } from '@app/biaya/dtos/filter-biaya.dto';

@Injectable()
export class BiayaService {
  constructor(
    private readonly biayaRepository: BiayaRepository,
    private readonly journalService: JournalService,
    private readonly journalTemplatesService: JournalTemplatesService,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: FilterBiayaDto, siteId: string) {
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
  handleDailyCostGeneration = async () => {
    const batchOnGoingData = await this.prismaService.batch.findMany({
      where: { status: 'ONGOING' },
    });

    if (batchOnGoingData.length === 0) {
      console.log('No batch ongoing');
      return;
    }

    const batchOnGoing = batchOnGoingData[0];

    const locations = await this.prismaService.site.findMany({
      where: { deletedAt: null },
      include: {
        cages: {
          where: { deletedAt: null },
        },
      },
    });

    const date = DateTime.now().toFormat('yyyy-MM-dd');

    const chickenFeedRate = 0.12;
    const depreciationRate = 0.025;
    const eggTrayCapacity = 30;
    const eggCrateCapacity = 240;
    const docLifeSpan = 90;
    const ovkDenominator = 490;

    const cleaningCostPerChicken = 15000;
    const laborCost = 1800000;
    const miscCostPerChicken = 150;
    const equipmentRepairCost = 100;
    const coopDepreciationCost = 100000;
    const crateCost = 10000;
    const eggTrayCost = 700;
    const electricityCostPerChicken = 150;
    const doctorCostPerChicken = 65;
    const assistantCostPerChicken = 500;
    const feedCostPerKg = 7500;
    const ovkCostPerChicken = 350;
    const docCostPerChicken = 13000;
    const coopBuildingCostPerChicken = 75000;

    const costTemplates = [
      {
        item: 'Biaya Kebersihan Kandang',
        kategoriId: '90394a45-24e7-4cf6-93d8-b5b5b64b31a6',
        journalTypeId: 'ddf21622-16c2-4cb7-8e7b-01d1dd75059f',
        type: 'CHICKEN',
        price: cleaningCostPerChicken,
        formula: (currentCountChicken: number) => currentCountChicken / 30,
      },
      {
        item: 'Biaya Tenaga Kerja Timbang',
        kategoriId: '90394a45-24e7-4cf6-93d8-b5b5b64b31a6',
        journalTypeId: 'ddf21622-16c2-4cb7-8e7b-01d1dd75059f',
        type: 'CHICKEN',
        price: laborCost,
        formula: (currentCountChicken: number) =>
          (6 * laborCost) / currentCountChicken,
      },
      {
        item: 'Biaya Lain-lain',
        kategoriId: '8abf72b5-f324-4ebb-92b3-04c812ab41b0',
        journalTypeId: 'c0ecbff2-8d7f-4a24-bc44-d550a77b49a3',
        type: 'CHICKEN',
        price: miscCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * miscCostPerChicken) / 30,
      },
      {
        item: 'Biaya Perbaikan & Penambahan Peralatan',
        kategoriId: '8abf72b5-f324-4ebb-92b3-04c812ab41b0',
        journalTypeId: '812cb692-3105-4b51-9487-971a186f64ba',
        type: 'CHICKEN',
        price: equipmentRepairCost,
        formula: (currentCountChicken: number) =>
          ((currentCountChicken / 2) * equipmentRepairCost) / 30,
      },
      {
        item: 'Biaya Penyusutan Kandang',
        kategoriId: '8abf72b5-f324-4ebb-92b3-04c812ab41b0',
        journalTypeId: '812cb692-3105-4b51-9487-971a186f64ba',
        type: 'CHICKEN',
        price: coopDepreciationCost,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * coopDepreciationCost * depreciationRate) / 120,
      },
      {
        item: 'Biaya Peti Telur',
        kategoriId: '9567eb02-37d4-4984-86a0-ab6c3dca6cf0',
        journalTypeId: '5f02199a-65e0-48de-9075-e21613680858',
        price: crateCost,
        type: 'EGG',
        formula: (countEggGood: number) =>
          ((countEggGood / eggCrateCapacity) * crateCost) / 7,
      },
      {
        item: 'Biaya Eggtray',
        kategoriId: '9567eb02-37d4-4984-86a0-ab6c3dca6cf0',
        journalTypeId: '5f02199a-65e0-48de-9075-e21613680858',
        price: eggTrayCost,
        type: 'EGG',
        formula: (countEggGood: number) =>
          (countEggGood / eggTrayCapacity) * eggTrayCost,
      },
      {
        item: 'Biaya Listrik',
        kategoriId: 'fd580575-8495-44fc-83ff-2a7fc614a19a',
        journalTypeId: '338a6ca7-eae8-47f6-b3f3-730adcf12ac5',
        type: 'CHICKEN',
        price: electricityCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * electricityCostPerChicken) / 30,
      },
      {
        item: 'Biaya Dokter',
        kategoriId: 'e6be7f6e-659d-4952-823c-530dd522e234',
        journalTypeId: 'ddf21622-16c2-4cb7-8e7b-01d1dd75059f',
        type: 'CHICKEN',
        price: doctorCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * doctorCostPerChicken) / 30,
      },
      {
        item: 'Biaya Anak Buah Kandang',
        kategoriId: '90394a45-24e7-4cf6-93d8-b5b5b64b31a6',
        journalTypeId: 'ddf21622-16c2-4cb7-8e7b-01d1dd75059f',
        type: 'CHICKEN',
        price: assistantCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * assistantCostPerChicken) / 30,
      },
      {
        item: 'Biaya Pakan',
        kategoriId: 'a0434547-f673-4b8a-844c-db07a290e435',
        journalTypeId: '03ff47d9-b441-44a9-bb21-47385069491d',
        type: 'CHICKEN',
        price: feedCostPerKg,
        formula: (currentCountChicken: number) =>
          currentCountChicken * chickenFeedRate * feedCostPerKg,
      },
      {
        item: 'Biaya OVK',
        kategoriId: 'e6be7f6e-659d-4952-823c-530dd522e234',
        journalTypeId: '03ff47d9-b441-44a9-bb21-47385069491d',
        type: 'CHICKEN',
        price: ovkCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * ovkCostPerChicken) / ovkDenominator,
      },
      {
        item: 'Biaya Pembelian DOC',
        kategoriId: '366bc010-6189-4e0c-8c59-31cc937624eb',
        journalTypeId: '812cb692-3105-4b51-9487-971a186f64ba',
        type: 'CHICKEN',
        price: docCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken * docCostPerChicken) / docLifeSpan / 30,
      },
      {
        item: 'Biaya Pembuatan Kandang',
        kategoriId: '8abf72b5-f324-4ebb-92b3-04c812ab41b0',
        journalTypeId: 'c0ecbff2-8d7f-4a24-bc44-d550a77b49a3',
        type: 'CHICKEN',
        price: coopBuildingCostPerChicken,
        formula: (currentCountChicken: number) =>
          (currentCountChicken *
            coopBuildingCostPerChicken *
            depreciationRate) /
          30,
      },
    ];

    const costs: {
      kategoriId: string;
      tanggal: string;
      biaya: number;
      siteId: string;
      cageId: string;
      journalTypeId: string;
      batchId: string;
      userId: string;
      status: number;
      keterangan: string;
    }[] = [];

    for (const location of locations) {
      for (const cage of location.cages) {
        const [currentCountChicken, countEggGoodData] = await Promise.all([
          this.prismaService.chicken.count({
            where: {
              deletedAt: null,
              status: 'ALIVE',
              rack: {
                cageId: cage.id,
              },
            },
          }),
          this.prismaService.warehouseTransaction.findMany({
            where: {
              category: 'EGG',
              siteId: location.id,
              cageId: cage.id,
              deletedAt: null,
              AND: {
                createdAt: {
                  gte: new Date(DateTime.now().toISODate()).toISOString(),
                  lte: new Date(
                    DateTime.now().plus({ days: 1 }).toISODate(),
                  ).toISOString(),
                },
              },
            },
          }),
        ]);

        const countEggGood = countEggGoodData.reduce(
          (acc, curr) => acc + curr.qty,
          0,
        );

        // console table to show the current count of chicken and egg of cage and location
        console.table({
          Location: location.name,
          Cage: cage.name,
          'Current Chicken': currentCountChicken,
          'Current Egg': countEggGood,
        });

        const locationCosts = costTemplates.map((template) => {
          const biaya: number = template.formula(
            template.type == 'EGG' ? countEggGood : currentCountChicken,
          );

          return {
            kategoriId: template.kategoriId,
            tanggal: date,
            biaya,
            siteId: location.id,
            cageId: cage.id,
            journalTypeId: template.journalTypeId,
            batchId: batchOnGoing.id,
            userId: 'fafeeb2e-4783-424f-b220-321954cefb66',
            status: 1,
            keterangan:
              'Biaya Auto-Generated by System ' + template.item + ' ' + date,
          };
        });

        costs.push(...locationCosts);
      }
    }

    // costs.forEach((cost) => {
    //   this.create(cost as CreateBiayaDTO).subscribe();
    // });

    return costs;
  };

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
