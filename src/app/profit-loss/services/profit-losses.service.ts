import { Injectable } from '@nestjs/common';
import { ProfitLossesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCoasDto, UpdateCoasDto } from '../dtos';
import { from } from 'rxjs';
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
  ) {
    const pendapatan = [401, 402];
    const bebanHPPTelur = [502, 503, 504];
    const bebanHPPAfkir = [506, 507, 508];
    const bebanOperasional = [602, 603, 604, 605, 606, 607, 608, 609];

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

          console.log({
            gte: await this.getFirstJournalDate(), // Fungsi untuk mendapatkan tanggal pertama di journalHeader
            lte: new Date(
              new Date(`${year}-${month}-01`).setMonth(
                new Date(`${year}-${month}-01`).getMonth() + 1,
              ) - 1,
            ), // Tanggal akhir berdasarkan input pengguna
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

    const totalDebit = result.reduce(
      (sum, item) => sum + (item._sum.debit || 0),
      0,
    );
    const totalCredit = result.reduce(
      (sum, item) => sum + (item._sum.credit || 0),
      0,
    );

    const totalPendapatan = result.reduce((total, balanceSheet) => {
      if (pendapatan.includes(Number(balanceSheet.coa.code))) {
        return total + (balanceSheet._sum.debit - balanceSheet._sum.credit);
      }
      return total;
    }, 0);

    const totalBebanHPPTelur = result.reduce((total, balanceSheet) => {
      if (bebanHPPTelur.includes(Number(balanceSheet.coa.code))) {
        return total + (balanceSheet._sum.debit - balanceSheet._sum.credit);
      }
      return total;
    }, 0);

    const totalBebanHPPAfkir = result.reduce((total, balanceSheet) => {
      if (bebanHPPAfkir.includes(Number(balanceSheet.coa.code))) {
        return total + (balanceSheet._sum.debit - balanceSheet._sum.credit);
      }
      return total;
    }, 0);

    const totalBebanOperasional = result.reduce((total, balanceSheet) => {
      if (bebanOperasional.includes(Number(balanceSheet.coa.code))) {
        return total + (balanceSheet._sum.debit - balanceSheet._sum.credit);
      }
      return total;
    }, 0);

    const netProfit =
      totalPendapatan -
      (totalBebanHPPAfkir + totalBebanHPPTelur + totalBebanOperasional);

    return {
      trialBalance: result,
      netProfit,
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit,
    };
  }
}
