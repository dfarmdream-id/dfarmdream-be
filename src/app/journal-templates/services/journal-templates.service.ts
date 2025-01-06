import { Injectable } from '@nestjs/common';
import { JournalTemplatesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalTemplatesDto, UpdateJournalTemplatesDto } from '../dtos';
import {
  catchError,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { JournalTemplateDetailsRepository } from '@app/journal-templates/repositories/journal-template-details.repository';

@Injectable()
export class JournalTemplatesService {
  constructor(
    private readonly journaltemplateRepository: JournalTemplatesRepository,
    private readonly journaltemplateDetailRepository: JournalTemplateDetailsRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.journaltemplateRepository.paginate(paginateDto, {
        where: {
          deletedAt: null, // Filter journal template yang tidak terhapus
        },
        include: {
          jurnalType: {
            select: {
              id: true,
              name: true,
            },
          },
          journalTemplateDetails: {
            where: {
              deletedAt: null, // Filter journal template yang tidak terhapus
            },
            select: {
              id: true,
              typeLedger: true,
              status: true,
              coa: {
                select: {
                  code: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.journaltemplateRepository.firstOrThrow(
        { id },
        {
          id: true,
          name: true,
          status: true,
          code: true,
          jurnalType: {
            select: {
              id: true,
              name: true,
            },
          },
          journalTemplateDetails: {
            where: {
              deletedAt: null, // Filter journal template yang tidak terhapus
            },
            select: {
              id: true,
              typeLedger: true,
              status: true,
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

  public findFirstByJournalTypeId(journalTypeId: string) {
    return from(
      this.journaltemplateRepository.findFirst({
        jurnalType: {
          id: journalTypeId,
        },
      }),
    ).pipe(
      switchMap((journalTemplate) => {
        if (!journalTemplate) {
          return throwError(
            () =>
              new Error(
                'Jurnal template tidak ditemukan, silahkan buat jurnal template terlebih dahulu',
              ),
          );
        }
        return of(journalTemplate);
      }),
      catchError((error) => {
        throw new Error(`${error.message}`);
      }),
    );
  }

  public destroy(id: string) {
    return from(this.journaltemplateRepository.delete({ id }));
  }

  public create(createJournalTemplatesDto: CreateJournalTemplatesDto) {
    return from(
      this.journaltemplateRepository.create({
        name: createJournalTemplatesDto.name,
        code: createJournalTemplatesDto.code,
        status: createJournalTemplatesDto.status,
        jurnalType: {
          connect: {
            id: createJournalTemplatesDto.journalTypeId,
          },
        },
      }),
    ).pipe(
      switchMap((journalTemplate) => {
        const createDetails$ = createJournalTemplatesDto.details.map((detail) =>
          this.journaltemplateDetailRepository.create({
            typeLedger: detail.typeLedger,
            status: detail.status,
            jurnalTemplate: {
              connect: {
                code: journalTemplate.code,
              },
            },
            coa: {
              connect: {
                code: detail.coaCode,
              },
            },
          }),
        );

        // Execute all details creation in parallel
        return forkJoin(createDetails$).pipe(
          map((details) => ({
            journalTemplate,
            details,
          })),
        );
      }),
    );
  }

  public update(
    id: string,
    updateJournalTemplatesDto: UpdateJournalTemplatesDto,
  ) {
    const updateTemplate$ = from(
      this.journaltemplateRepository.update(
        { id },
        {
          name: updateJournalTemplatesDto.name,
          code: updateJournalTemplatesDto.code,
          status: updateJournalTemplatesDto.status,
          jurnalType: {
            connect: {
              id: updateJournalTemplatesDto.journalTypeId,
            },
          },
        },
      ),
    );

    // Fetch existing details from database
    const existingDetails$ = from(
      this.journaltemplateDetailRepository.find({
        where: {
          jurnalTemplate: {
            id,
          },
        },
      }),
    );

    const updateDetails$ = existingDetails$.pipe(
      switchMap((existingDetails) => {
        const incomingDetailIds =
          updateJournalTemplatesDto.details
            ?.filter((detail) => detail.id)
            .map((detail) => detail.id) || [];

        // Find details to delete
        const detailsToDelete = existingDetails.filter(
          (existingDetail) => !incomingDetailIds.includes(existingDetail.id),
        );

        // Delete details that are not in the incoming list
        const deleteDetails$ = detailsToDelete.map((detail) =>
          this.journaltemplateDetailRepository.delete({ id: detail.id }),
        );

        // Process create or update for each incoming detail
        const upsertDetails$ =
          updateJournalTemplatesDto.details?.map((detail) => {
            if (detail.id) {
              // Update existing detail
              return this.journaltemplateDetailRepository.upsert({
                where: { id: detail.id },
                create: {
                  typeLedger: detail.typeLedger,
                  status: detail.status,
                  jurnalTemplate: {
                    connect: { id },
                  },
                  coa: {
                    connect: { code: detail.coaCode },
                  },
                },
                update: {
                  typeLedger: detail.typeLedger,
                  status: detail.status,
                  coa: {
                    connect: { code: detail.coaCode },
                  },
                },
              });
            } else {
              // Create new detail
              return this.journaltemplateDetailRepository.create({
                typeLedger: detail.typeLedger,
                status: detail.status,
                jurnalTemplate: {
                  connect: { id },
                },
                coa: {
                  connect: { code: detail.coaCode },
                },
              });
            }
          }) || [];

        return forkJoin([...deleteDetails$, ...upsertDetails$]);
      }),
    );

    // Combine updates
    return forkJoin([updateTemplate$, updateDetails$]).pipe(
      map(([journalTemplate, details]) => ({
        journalTemplate,
        details,
      })),
    );
  }
}
