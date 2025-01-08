import { Injectable } from '@nestjs/common';
import { JournalHeaderRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalDto, UpdateJournalDto } from '../dtos';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/platform/database/services/prisma.service';

@Injectable()
export class JournalService {
  constructor(
    private readonly journalHeaderRepository: JournalHeaderRepository,
    private readonly journalDetailRepository: JournalDetailRepository,
    private readonly prismaService: PrismaService,
  ) {}

  public paginate(
    paginateDto: PaginationQueryDto,
    cageId: string,
    batchId: string,
    siteId: string,
  ) {
    const { q, dateRange } = paginateDto;

    // Filter tambahan untuk rentang tanggal
    const where: any = {
      deletedAt: null, // Filter journal yang tidak terhapus
      siteId,
      cageId,
      batchId,
    };

    if (q) {
      where.OR = [
        { code: { contains: q, mode: 'insensitive' } },
        {
          journalType: {
            name: {
              contains: q,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (dateRange?.start && dateRange?.end) {
      where.createdAt = {
        gte: new Date(dateRange.start),
        lte: new Date(dateRange.end),
      };
    }

    return from(
      this.journalHeaderRepository.paginate(paginateDto, {
        where,
        include: {
          journalType: {
            select: {
              id: true,
              name: true,
            },
          },
          journalDetails: {
            where: {
              deletedAt: null, // Filter journal yang tidak terhapus
            },
            select: {
              id: true,
              debit: true,
              credit: true,
              note: true,
              coa: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          },
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.journalHeaderRepository.firstOrThrow(
        { id },
        {
          id: true,
          code: true,
          creditTotal: true,
          date: true,
          debtTotal: true,
          journalType: {
            select: {
              id: true,
              name: true,
            },
          },
          status: true,
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
          journalDetails: {
            select: {
              id: true,
              debit: true,
              credit: true,
              note: true,
              coa: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          },
        },
      ),
    );
  }

  public destroy(id: string) {
    return from(this.journalHeaderRepository.delete({ id }));
  }

  public create(createJournalHeadersDto: CreateJournalDto, userId: string) {
    // Create the journal header

    console.log('createJournalHeadersDto', createJournalHeadersDto);

    const createHeader$ = from(
      this.journalHeaderRepository.create({
        code: createJournalHeadersDto.code,
        creditTotal: createJournalHeadersDto.creditTotal,
        // date: createJournalHeadersDto.date,
        date:
          DateTime.fromISO(createJournalHeadersDto.date)?.toISO()?.toString() ??
          DateTime.now().toISO().toString(),
        debtTotal: createJournalHeadersDto.debtTotal,
        journalType: {
          connect: {
            id: createJournalHeadersDto.journalTypeId,
          },
        },
        status: createJournalHeadersDto.status,
        user: { connect: { id: userId } },
        ...(createJournalHeadersDto.createdAt && {
          createdAt: createJournalHeadersDto.createdAt,
        }),
        ...(createJournalHeadersDto.updatedAt && {
          updatedAt: createJournalHeadersDto.updatedAt,
        }),
        ...(createJournalHeadersDto.batchId && {
          batch: {
            connect: {
              id: createJournalHeadersDto.batchId,
            },
          },
        }),
        ...(createJournalHeadersDto.cageId && {
          cage: {
            connect: {
              id: createJournalHeadersDto.cageId,
            },
          },
        }),
        ...(createJournalHeadersDto.siteId && {
          site: {
            connect: {
              id: createJournalHeadersDto.siteId,
            },
          },
        }),
      }),
    );

    // Handle journal details
    return createHeader$.pipe(
      switchMap((journalHeader) => {
        // Map over details and create each one
        const createDetails$ = createJournalHeadersDto.details.map((detail) =>
          this.journalDetailRepository.create({
            journalHeader: {
              connect: {
                id: journalHeader.id,
              },
            },
            coa: {
              connect: {
                code: detail.coaCode,
              },
            },
            debit: detail.debit,
            credit: detail.credit,
            note: detail.note,
            ...(createJournalHeadersDto.createdAt && {
              createdAt: createJournalHeadersDto.createdAt,
            }),
            ...(createJournalHeadersDto.updatedAt && {
              updatedAt: createJournalHeadersDto.updatedAt,
            }),
          }),
        );

        // Combine all detail creation promises
        return forkJoin(createDetails$).pipe(
          map((details) => ({
            journalHeader,
            details,
          })),
        );
      }),
    );
  }

  public update(id: string, updateJournalHeadersDto: UpdateJournalDto) {
    // Update journal header
    const updateHeader$ = from(
      this.journalHeaderRepository.update(
        { id },
        {
          code: updateJournalHeadersDto.code,
          creditTotal: updateJournalHeadersDto.creditTotal,
          date: updateJournalHeadersDto.date,
          debtTotal: updateJournalHeadersDto.debtTotal,
          journalType: {
            connect: {
              id: updateJournalHeadersDto.journalTypeId,
            },
          },
          status: updateJournalHeadersDto.status,
        },
      ),
    );

    // Fetch existing details from database
    const existingDetails$ = from(
      this.journalDetailRepository.find({
        where: { journalHeaderId: id },
      }),
    );

    const updateDetails$ = existingDetails$.pipe(
      switchMap((existingDetails) => {
        const incomingDetailIds =
          updateJournalHeadersDto.details
            ?.filter((detail) => detail.id)
            .map((detail) => detail.id) || [];

        // Find details to delete
        const detailsToDelete = existingDetails.filter(
          (existingDetail) => !incomingDetailIds.includes(existingDetail.id),
        );

        // Delete details that are not in the incoming list
        const deleteDetails$ = detailsToDelete.map((detail) =>
          this.journalDetailRepository.delete({ id: detail.id }),
        );

        // Process create or update for each incoming detail
        const upsertDetails$ =
          updateJournalHeadersDto.details?.map((detail) => {
            if (detail.id) {
              // Update existing detail
              return this.journalDetailRepository.upsert({
                where: { id: detail.id },
                create: {
                  journalHeader: { connect: { id } },
                  coa: { connect: { code: detail.coaCode } },
                  debit: detail.debit,
                  credit: detail.credit,
                  note: detail.note,
                },
                update: {
                  coa: { connect: { code: detail.coaCode } },
                  debit: detail.debit,
                  credit: detail.credit,
                  note: detail.note,
                },
              });
            } else {
              // Create new detail
              return this.journalDetailRepository.create({
                journalHeader: { connect: { id } },
                coa: { connect: { code: detail.coaCode } },
                debit: detail.debit,
                credit: detail.credit,
                note: detail.note,
              });
            }
          }) || [];

        return forkJoin([...deleteDetails$, ...upsertDetails$]);
      }),
    );

    // Combine updates
    return forkJoin([updateHeader$, updateDetails$]).pipe(
      map(([journalHeader, details]) => ({
        journalHeader,
        details,
      })),
    );
  }

  // balanceSheet
  async getTrialBalance(
    month: string,
    year: string,
    cageId: string,
    batchId: string,
    siteId: string,
  ) {
    // Step 1: Ambil semua data COA yang isBalanceSheet = true
    const coaList = await this.prismaService.coa.findMany({
      where: {
        isBalanceSheet: true,
      },
      select: {
        code: true,
        name: true,
        level: true,
        isBalanceSheet: true,
        isRetainedEarnings: true,
      },
      orderBy: [
        {
          code: 'asc',
        },
      ],
    });

    // Step 2: Map COA dan cari jurnal terkait, sum debit dan kredit
    const result = await Promise.all(
      coaList.map(async (coa) => {
        let debit = 0;
        let credit = 0;

        if (month !== '0' && year !== '0') {
          const journalSum = await this.prismaService.journalDetail.aggregate({
            _sum: {
              debit: true,
              credit: true,
            },
            where: {
              coaCode: coa.code, // Sum transaksi hanya untuk COA tertentu
              journalHeader: {
                cageId,
                batchId,
                siteId,
                createdAt: {
                  gte: await this.getFirstJournalDate(), // Fungsi untuk mendapatkan tanggal pertama di journalHeader
                  lte: new Date(
                    new Date(`${year}-${month}-01`).setMonth(
                      new Date(`${year}-${month}-01`).getMonth() + 1,
                    ) - 1,
                  ), // Tanggal akhir berdasarkan input pengguna
                },
              },
            },
          });

          debit = journalSum?._sum?.debit ?? 0;
          credit = journalSum?._sum?.credit ?? 0;
        }

        return {
          _sum: {
            debit,
            credit,
          },
          coa, // Tambahkan data COA
        };
      }),
    );

    // Step 3: Hitung total debit dan kredit
    const totalDebit = result.reduce(
      (sum, item) => sum + (item._sum.debit || 0),
      0,
    );
    const totalCredit = result.reduce(
      (sum, item) => sum + (item._sum.credit || 0),
      0,
    );

    // Step 4: Format hasil dengan status neraca
    return {
      trialBalance: result,
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit,
    };
  }

  async getChartBalanceSheetAndProfit(month: string, year: string, siteId: string) {
    // if year is not provided, use current year
    if (!year) {
      year = new Date().getFullYear().toString();
    }

    // Step 1: Ambil semua data COA
    const coaList = await this.prismaService.coa.findMany({
      select: {
        code: true,
        name: true,
        level: true,
        isBalanceSheet: true,
        isRetainedEarnings: true,
      },
      orderBy: [
        {
          code: 'asc',
        },
      ],
    });

    // Group codes for categorization
    const categories = {
      kasDanSetaraKas: [101, 102],
      persediaan: [121, 124, 125],
      piutang: [141, 142],
      assetTetap: [131, 132],
      utangDagang: [201],
      modal: [301],
      pendapatan: [401, 402],
      bebanHPPTelur: [502, 503, 504],
      bebanHPPAfkir: [506, 507, 508],
      bebanOperasional: [602, 603, 604, 605, 606, 607, 608, 609],
    };

    // Helper function to calculate totals
    const calculateTotal = (result, codes: number[], isCredit = false) =>
      result.reduce((total, item) => {
        if (codes.includes(Number(item.coa.code))) {
          return (
            total +
            (isCredit
              ? item._sum.credit - item._sum.debit
              : item._sum.debit - item._sum.credit)
          );
        }
        return total;
      }, 0);

    // Step 2: Iterasi untuk setiap bulan dalam tahun
    const chartData: {
      month: number;
      totalAsset: number;
      totalEquitas: number;
      netProfit: number;
    }[] = [];
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(
        `${year}-${month.toString().padStart(2, '0')}-01`,
      );
      const endDate = new Date(
        new Date(startDate).setMonth(startDate.getMonth() + 1) - 1,
      );

      const result = await Promise.all(
        coaList.map(async (coa) => {
          const journalSum = await this.prismaService.journalDetail.aggregate({
            _sum: {
              debit: true,
              credit: true,
            },
            where: {
              coaCode: coa.code,
              journalHeader: {
                siteId,
                createdAt: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          });

          return {
            _sum: {
              debit: journalSum?._sum?.debit ?? 0,
              credit: journalSum?._sum?.credit ?? 0,
            },
            coa,
          };
        }),
      );

      // Calculate totals for the month
      const totalAsset = calculateTotal(result, [
        ...categories.kasDanSetaraKas,
        ...categories.persediaan,
        ...categories.piutang,
        ...categories.assetTetap,
      ]);

      const totalPendapatan = calculateTotal(result, categories.pendapatan);
      const totalBebanHPPTelur = calculateTotal(
        result,
        categories.bebanHPPTelur,
      );
      const totalBebanHPPAfkir = calculateTotal(
        result,
        categories.bebanHPPAfkir,
      );
      const totalBebanOperasional = calculateTotal(
        result,
        categories.bebanOperasional,
      );

      const netProfit =
        totalPendapatan -
        (totalBebanHPPTelur + totalBebanHPPAfkir + totalBebanOperasional);

      const totalEquitas =
        calculateTotal(
          result,
          [...categories.utangDagang, ...categories.modal],
          true,
        ) + netProfit;

      // Push data for the month
      chartData.push({
        month,
        totalAsset,
        totalEquitas,
        netProfit,
      });
    }

    const totalAsset = chartData.reduce(
      (sum, item) => sum + item.totalAsset,
      0,
    );
    const totalEquitas = chartData.reduce(
      (sum, item) => sum + item.totalEquitas,
      0,
    );
    const totalNetProfit = chartData.reduce(
      (sum, item) => sum + item.netProfit,
      0,
    );

    return {
      chart: chartData,
      totalAsset,
      totalEquitas,
      totalNetProfit,
    };
  }

  async getFirstJournalDate(): Promise<Date> {
    const firstJournal = await this.prismaService.journalHeader.findFirst({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        createdAt: true,
      },
    });

    return firstJournal?.createdAt || new Date(0); // Default ke Unix epoch jika tidak ada data
  }

  public async sumJournalDetail(filter: {
    where: { note: { contains: string } };
  }): Promise<{ debtTotal: number }> {
    // Query the database for journal details matching the given note filter
    const journalDetails = await this.prismaService.journalDetail.findMany({
      where: filter.where,
      select: {
        debit: true,
      },
    });

    // Sum up the `debit` values from the retrieved journal details
    const debtTotal = journalDetails.reduce(
      (sum, detail) => sum + detail.debit,
      0,
    );

    return { debtTotal };
  }
}
