import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WarehouseTransactionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateWarehouseTransactionsDto,
  UpdateWarehouseTransactionsDto,
} from '../dtos';
import { catchError, concatMap, from, map, switchMap, throwError } from 'rxjs';
import { DateTime } from 'luxon';
import { PricesRepository } from '@src/app/prices/repositories';
import {
  Prisma,
  WarehouseTransactionCategoryEnum,
  WarehouseTransactionType,
} from '@prisma/client';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { CreateJournalDetailDto, CreateJournalDto } from '@app/journal/dtos';
import { JournalService } from '@app/journal/services';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';
import { JournalTemplatesService } from '@app/journal-templates/services';

@Injectable()
export class WarehouseTransactionsService {
  constructor(
    private readonly warehousetransactionRepository: WarehouseTransactionsRepository,
    private readonly priceRepository: PricesRepository,
    private readonly prismaService: PrismaService,
    private readonly journalService: JournalService,
    private readonly journalTemplatesService: JournalTemplatesService,
  ) {}

  async sendToCashier(
    id: string,
    { typeSell, typeCash }: { typeSell: string; typeCash: string },
    user: JWTClaim,
  ) {
    // Helper untuk logging
    const log = (message: string, data: any) =>
      console.log(`[sendToCashier] ${message}`, data);

    // Fetch data warehouse transaction
    const models = await this.prismaService.warehouseTransaction.findFirst({
      where: { id },
      include: { price: true },
    });

    if (!models) {
      log('Data not found', { models });
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
    }

    const countJournal = await this.prismaService.journalHeader.count();

    // Fetch journal templates
    const [typeSellTemplate, typeCashTemplate] = await Promise.all([
      this.prismaService.journalTemplate.findFirst({
        where: { jurnalTypeId: typeSell },
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
      }),
      this.prismaService.journalTemplate.findFirst({
        where: { jurnalTypeId: typeCash },
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
      }),
    ]);

    if (typeCashTemplate && typeSellTemplate) {
      // Helper untuk membuat detail jurnal
      const createJournalDetails = (
        template: any,
        multiplier: number,
        notePrefix: string,
      ): CreateJournalDetailDto[] =>
        template.journalTemplateDetails.map((detail: any) => ({
          coaCode: detail.coa.code,
          credit: detail.typeLedger === 'CREDIT' ? multiplier : 0,
          debit: detail.typeLedger === 'DEBIT' ? multiplier : 0,
          note: `${notePrefix} - ${detail.coa.name}`,
        }));

      const multiplier = (models.price?.value ?? 0) * models.weight;

      // Detail untuk jurnal penjualan
      const detailsSell = createJournalDetails(
        typeSellTemplate,
        multiplier,
        'Penjualan',
      );

      const journalSell: CreateJournalDto = {
        code: `JN-${DateTime.now().toFormat('yy-MM')}-${countJournal + 1}`, // Unique code
        // date: new Date().toISOString(), format 2024-12-10 just date yyyy-mm-dd
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        debtTotal: detailsSell.reduce((acc, item) => acc + item.debit, 0),
        creditTotal: detailsSell.reduce((acc, item) => acc + item.credit, 0),
        status: '1',
        journalTypeId: typeSell,
        cageId: models.cageId,
        siteId: models.siteId,
        details: detailsSell,
      };

      // this.journalService.create(journalSell, user.id);
      from(this.journalService.create(journalSell, user.id)).subscribe();

      // Detail untuk jurnal kas
      const detailsCash = createJournalDetails(
        typeCashTemplate,
        multiplier,
        'Penerimaan Kas',
      );

      const journalCash: CreateJournalDto = {
        code: `JN-${DateTime.now().toFormat('yy-MM')}-${countJournal + 2}`, // Unique code
        date: DateTime.now().toFormat('yyyy-MM-dd'),
        debtTotal: detailsCash.reduce((acc, item) => acc + item.debit, 0),
        creditTotal: detailsCash.reduce((acc, item) => acc + item.credit, 0),
        status: '1',
        journalTypeId: typeCash,
        cageId: models.cageId,
        siteId: models.siteId,
        details: detailsCash,
      };

      // this.journalService.create(journalCash, user.id);
      from(this.journalService.create(journalCash, user.id)).subscribe();
    }

    try {
      // Update transaksi
      await this.prismaService.warehouseTransaction.update({
        where: { id },
        data: { CashierDeliveryAt: new Date() },
      });

      return {
        status: HttpStatus.OK,
        message: 'Success send data into cashier',
        data: [],
      };
    } catch (error) {
      log('Error occurred', error);
      throw new HttpException(
        'Failed to send to cashier',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  createJournal(data: CreateJournalDto, userId: string) {
    return from(this.journalService.create(data, userId));
  }

  // async sendToCashier(
  //   id: string,
  //   {
  //     typeSell,
  //     typeCash,
  //   }: {
  //     typeSell: string;
  //     typeCash: string;
  //   },
  //   user: JWTClaim,
  // ) {
  //   const models = await this.prismaService.warehouseTransaction.findFirst({
  //     where: { id },
  //     include: {
  //       price: true,
  //     },
  //   });
  //
  //   const typeSellTemplate = await this.prismaService.journalTemplate.findFirst(
  //     {
  //       where: {
  //         jurnalTypeId: typeSell,
  //       },
  //       include: {
  //         journalTemplateDetails: {
  //           where: {
  //             deletedAt: null, // Filter hanya yang tidak terhapus
  //           },
  //           select: {
  //             id: true,
  //             typeLedger: true,
  //             status: true,
  //             coa: {
  //               select: {
  //                 code: true,
  //                 name: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   );
  //
  //   const typeCashTemplate = await this.prismaService.journalTemplate.findFirst(
  //     {
  //       where: {
  //         jurnalTypeId: typeCash,
  //       },
  //       include: {
  //         journalTemplateDetails: {
  //           where: {
  //             deletedAt: null, // Filter hanya yang tidak terhapus
  //           },
  //           select: {
  //             id: true,
  //             typeLedger: true,
  //             status: true,
  //             coa: {
  //               select: {
  //                 code: true,
  //                 name: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   );
  //
  //   if (!models || !typeSellTemplate || !typeCashTemplate) {
  //     throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   try {
  //     const details: CreateJournalDetailDto[] =
  //       typeSellTemplate?.journalTemplateDetails.map((detail) => ({
  //         coaCode: detail.coa.code,
  //         credit:
  //           detail.typeLedger === 'CREDIT'
  //             ? (models?.price?.value ?? 0) * models?.weight
  //             : 0,
  //         debit:
  //           detail.typeLedger === 'DEBIT'
  //             ? (models?.price?.value ?? 0) * models?.weight
  //             : 0,
  //         note: `Penjualan - ${detail.coa.name}`,
  //       })) ?? [];
  //
  //     const journalDto: CreateJournalDto = {
  //       code: `PM-${Date.now()}`,
  //       date: new Date().toISOString(),
  //       debtTotal: details.reduce((acc, item) => acc + item.debit, 0),
  //       creditTotal: details.reduce((acc, item) => acc + item.credit, 0),
  //       status: '1', // Status Jurnal
  //       journalTypeId: typeSell,
  //       cageId: models.cageId,
  //       siteId: models.siteId,
  //       details,
  //     };
  //
  //     this.journalService.create(journalDto, user.id);
  //
  //     const detailsCash: CreateJournalDetailDto[] =
  //       typeCashTemplate?.journalTemplateDetails.map((detail) => ({
  //         coaCode: detail.coa.code,
  //         credit:
  //           detail.typeLedger === 'CREDIT'
  //             ? (models?.price?.value ?? 0) * models?.weight
  //             : 0,
  //         debit:
  //           detail.typeLedger === 'DEBIT'
  //             ? (models?.price?.value ?? 0) * models?.weight
  //             : 0,
  //         note: `Penerimaan Kas - ${detail.coa.name}`,
  //       })) ?? [];
  //
  //     const journalDtoCash: CreateJournalDto = {
  //       code: `PM-${Date.now()}`,
  //       date: new Date().toISOString(),
  //       debtTotal: detailsCash.reduce((acc, item) => acc + item.debit, 0),
  //       creditTotal: detailsCash.reduce((acc, item) => acc + item.credit, 0),
  //       status: '1', // Status Jurnal
  //       journalTypeId: typeCash,
  //       cageId: models.cageId,
  //       siteId: models.siteId,
  //       details: detailsCash,
  //     };
  //
  //     this.journalService.create(journalDtoCash, user.id);
  //
  //     await this.prismaService.warehouseTransaction.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         CashierDeliveryAt: new Date(),
  //       },
  //     });
  //     return {
  //       status: HttpStatus.OK,
  //       message: 'Success send data into cashier',
  //       data: [],
  //     };
  //   } catch (e) {
  //     throw new HttpException(
  //       'Failed to send to cashier',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    const { q } = paginateDto;

    const searchConditions: Prisma.WarehouseTransactionWhereInput[] = [];

    if (q && q.length > 0) {
      // Mapping untuk type dan category
      const typeMapping: Record<string, WarehouseTransactionType> = {
        masuk: 'IN',
        keluar: 'OUT',
      };

      const categoryMapping: Record<string, WarehouseTransactionCategoryEnum> =
        {
          telur: 'EGG',
          ayam: 'CHICKEN',
        };

      // Mapping nilai pencarian
      const mappedType =
        typeMapping[q.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')] || null;
      const mappedCategory =
        categoryMapping[q.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')] || null;

      // Filter `OR` conditions dynamically

      if (mappedType) {
        searchConditions.push({ type: { equals: mappedType } });
      }

      if (mappedCategory) {
        searchConditions.push({ category: { equals: mappedCategory } });
      }

      searchConditions.push(
        { site: { name: { contains: q, mode: 'insensitive' } } },
        { cage: { name: { contains: q, mode: 'insensitive' } } },
        { createdBy: { fullName: { contains: q, mode: 'insensitive' } } },
      );
    }

    const where: Prisma.WarehouseTransactionWhereInput = {
      siteId,
      ...(searchConditions.length > 0 && { OR: searchConditions }),
    };

    // Debugging untuk `where` (Opsional)
    console.log('Generated Where Clause:', JSON.stringify(where, null, 2));

    // Mengembalikan hasil paginasi
    return this.warehousetransactionRepository.paginate(paginateDto, {
      where,
      include: {
        cage: true,
        site: true,
        createdBy: true,
        items: true,
        price: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public detail(id: string) {
    return from(
      this.warehousetransactionRepository.firstOrThrow(
        { id },
        {
          cage: true,
          site: true,
          createdBy: true,
          items: true,
          price: true,
        },
      ),
    );
  }

  public destroy(id: string) {
    return from(this.warehousetransactionRepository.delete({ id }));
  }

  public create(
    createWarehouseTransactionsDto: CreateWarehouseTransactionsDto,
    userId: string,
    siteId: string,
  ) {
    const price = this.priceRepository.find({
      where: {
        siteId,
        type: createWarehouseTransactionsDto.category,
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return price.pipe(
      map((data) => {
        if (!data[0]) {
          throw new Error(
            `Harga untuk kategori ${createWarehouseTransactionsDto.category} belum tersedia, silahkan tambahkan harga terlebih dahulu`,
          );
        }
        return data[0];
      }),
      concatMap((priceData) => {
        return from(
          this.warehousetransactionRepository.create({
            category: createWarehouseTransactionsDto.category,
            cage: {
              connect: {
                id: createWarehouseTransactionsDto.cageId,
              },
            },
            createdBy: {
              connect: {
                id: userId,
              },
            },
            site: {
              connect: {
                id: siteId,
              },
            },
            qty: createWarehouseTransactionsDto.haversts.reduce(
              (a, b) => a + b.qty,
              0,
            ),
            type: createWarehouseTransactionsDto.type,
            price: {
              connect: {
                id: priceData.id,
              },
            },
            weight: createWarehouseTransactionsDto.weight || 0,
            code: `${DateTime.now().toFormat('ddMMyyyy')}-${Math.random() * 1000}`,
            items: {
              createMany: {
                data: createWarehouseTransactionsDto.haversts.map((item) => {
                  return {
                    createdById: userId,
                    rackId: item.rackId,
                    qty: item.qty,
                  };
                }),
                skipDuplicates: true,
              },
            },
          }),
        ).pipe(
          concatMap((transaction) => {
            return from(
              this.journalTemplatesService.findFirstByJournalTypeId(
                createWarehouseTransactionsDto.journalTypeId,
              ),
            ).pipe(
              switchMap((journalTemplate) => {
                if (!journalTemplate) {
                  throw new Error(
                    `Journal template for type ${createWarehouseTransactionsDto.journalTypeId} not found.`,
                  );
                }

                const details: CreateJournalDetailDto[] =
                  journalTemplate.journalTemplateDetails.map((detail) => {
                    const amount = transaction.qty * priceData.value;
                    return {
                      coaCode: detail.coa.code,
                      debit: detail.typeLedger === 'DEBIT' ? amount : 0,
                      credit: detail.typeLedger === 'CREDIT' ? amount : 0,
                      note: `
                        Transaksi Gudang, Panen ${
                          createWarehouseTransactionsDto.category == 'EGG'
                            ? 'Telur'
                            : 'Ayam'
                        } - ${detail.coa.name}
                      `,
                    };
                  });

                const journalDto: CreateJournalDto = {
                  code: `JN-${DateTime.now().toFormat('yy-MM')}-${Math.floor(
                    Math.random() * 1000,
                  )}`,
                  date: DateTime.now().toISO(),
                  debtTotal: details.reduce((acc, item) => acc + item.debit, 0),
                  creditTotal: details.reduce(
                    (acc, item) => acc + item.credit,
                    0,
                  ),
                  status: '1',
                  journalTypeId: createWarehouseTransactionsDto.journalTypeId,
                  siteId: siteId,
                  cageId: createWarehouseTransactionsDto.cageId,
                  details,
                };

                return this.journalService.create(journalDto, userId);
              }),
              concatMap((journal) => {
                if (!journal) {
                  return throwError(
                    () => new Error('Failed to create journal entry'),
                  );
                }
                return from(Promise.resolve(transaction));
              }),
            );
          }),
        );
      }),
      catchError((error) => {
        console.log(error);
        throw new Error(error.message); // Handle the error properly here
      }),
    );
  }

  public update(
    id: string,
    updateWarehouseTransactionsDto: UpdateWarehouseTransactionsDto,
    userId: string,
  ) {
    return from(
      this.warehousetransactionRepository.update(
        { id },
        {
          cage: {
            connect: {
              id: updateWarehouseTransactionsDto.cageId,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
          qty: updateWarehouseTransactionsDto.haversts?.reduce(
            (acc, item) => acc + item.qty,
            0,
          ),
          type: updateWarehouseTransactionsDto.type,
          weight: updateWarehouseTransactionsDto.weight || 0,
          code: `${DateTime.now().toFormat('ddMMyyyy')}-${Math.random()}`,
          items: {
            deleteMany: {},
            createMany: {
              data:
                updateWarehouseTransactionsDto.haversts?.map((item) => {
                  return {
                    createdById: userId,
                    rackId: item.rackId,
                    qty: item.qty,
                  };
                }) || [],
              skipDuplicates: true,
            },
          },
        },
      ),
    );
  }
}
