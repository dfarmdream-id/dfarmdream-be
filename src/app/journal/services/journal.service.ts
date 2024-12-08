import { Injectable } from '@nestjs/common';
import { JournalHeaderRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalDto, UpdateJournalDto } from '../dtos';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';
import { DateTime } from 'luxon';

@Injectable()
export class JournalService {
  constructor(
    private readonly journalHeaderRepository: JournalHeaderRepository,
    private readonly journalDetailRepository: JournalDetailRepository,
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
}
