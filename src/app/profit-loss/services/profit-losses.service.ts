import { Injectable } from '@nestjs/common';
import { ProfitLossesRepository } from '../repositories';
import { PrismaService } from '@src/platform/database/services/prisma.service';

@Injectable()
export class ProfitLossesService {
  constructor(
    private readonly profitLossesRepository: ProfitLossesRepository,
    private readonly prismaService: PrismaService,
  ) {}

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

  async getProfitLoss(
    month: string,
    year: string,
    cageId: string,
    batchId: string,
    siteId: string,
  ) {
    const pendapatan = [401, 402];
    const bebanHPPTelur = [502, 503, 504];
    const bebanHPPAfkir = [506, 507, 508];
    const bebanOperasional = [602, 603, 604, 605, 606, 607, 608, 609];

    // Fetch COA list
    const coaList = await this.prismaService.coa.findMany({
      select: {
        code: true,
        name: true,
        level: true,
        isBalanceSheet: true,
        isRetainedEarnings: true,
      },
      orderBy: [{ code: 'asc' }],
    });

    // Fetch journal details for each COA
    const result = await Promise.all(
      coaList.map(async (coa) => {
        let debit = 0;
        let credit = 0;

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(
          new Date(startDate).setMonth(startDate.getMonth() + 1) - 1,
        );

        if (month !== '0' && year !== '0') {
          const journalSum = await this.prismaService.journalDetail.aggregate({
            _sum: { debit: true, credit: true },
            where: {
              coaCode: coa.code,
              journalHeader: {
                cageId,
                batchId,
                siteId,
                createdAt: {
                  gte: startDate, // Fungsi untuk mendapatkan tanggal pertama di journalHeader
                  lte: endDate, // Tanggal akhir berdasarkan input pengguna
                },
              },
            },
          });

          debit = journalSum?._sum?.debit ?? 0;
          credit = journalSum?._sum?.credit ?? 0;
        }

        return {
          _sum: { debit, credit },
          coa,
        };
      }),
    );

    // Calculate totals for each category
    const calculateTotal = (codes: number[], isPendapatan: boolean) => {
      return result.reduce((total, balanceSheet) => {
        if (codes.includes(Number(balanceSheet.coa.code))) {
          const diff = isPendapatan
            ? balanceSheet._sum.credit - balanceSheet._sum.debit
            : balanceSheet._sum.debit - balanceSheet._sum.credit;
          return total + diff;
        }
        return total;
      }, 0);
    };

    const totalPendapatan = calculateTotal(pendapatan, true);
    const totalBebanHPPTelur = calculateTotal(bebanHPPTelur, false);
    const totalBebanHPPAfkir = calculateTotal(bebanHPPAfkir, false);
    const totalBebanOperasional = calculateTotal(bebanOperasional, false);

    const netProfit =
      totalPendapatan -
      (totalBebanHPPTelur + totalBebanHPPAfkir + totalBebanOperasional);

    // Calculate debit and credit totals
    const totalDebit = result.reduce(
      (sum, item) => sum + (item._sum.debit || 0),
      0,
    );
    const totalCredit = result.reduce(
      (sum, item) => sum + (item._sum.credit || 0),
      0,
    );

    return {
      trialBalance: result,
      netProfit,
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit,
    };
  }
}
