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

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.journalHeaderRepository.paginate(paginateDto, {
        where: {
          deletedAt: null, // Filter journal yang tidak terhapus
        },
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
  async getTrialBalance() {
    // Step 1: GroupBy untuk mendapatkan debit dan kredit
    const groupedData = await this.prismaService.journalDetail.groupBy({
      by: ['coaCode'],
      _sum: {
        debit: true,
        credit: true,
      },
      orderBy: [
        {
          coaCode: 'asc',
        },
      ],
    });

    // Step 2: Ambil data Coa dan pilih field yang relevan
    const result = await Promise.all(
      groupedData.map(async (group) => {
        const coa = await this.prismaService.coa.findUnique({
          where: { code: group.coaCode }, // Ambil berdasarkan coaCode
          select: {
            code: true,
            name: true,
            level: true,
            isBalanceSheet: true,
            isRetainedEarnings: true,
          },
        });

        return {
          ...group,
          coa, // Hanya menyimpan data Coa yang diperlukan
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
      trialBalance: result.map(({ coaCode, ...rest }) => ({
        ...rest,
      })), // Menghapus coaCode dari hasil akhir
      totalDebit,
      totalCredit,
      isBalanced: totalDebit === totalCredit,
    };
  }
}
