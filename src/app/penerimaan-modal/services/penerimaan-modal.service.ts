import { Injectable } from '@nestjs/common';
import { CreatePenerimaanModal } from '../dtos/create-penerimaan-modal.dto';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { UpdatePenerimaanModalDTO } from '../dtos/update-penerimaan-modal.dto';
import { PenerimaanModalRepository } from '../repositories/penerimaan-modal.repository';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { JournalService } from '@app/journal/services';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';
import { JournalTemplatesService } from '@app/journal-templates/services';
import { CreateJournalDetailDto, CreateJournalDto } from '@app/journal/dtos';
import { DateTime } from 'luxon';

@Injectable()
export class PenerimaanModalService {
  constructor(
    private readonly penerimaanModalRepo: PenerimaanModalRepository,
    private readonly journalService: JournalService,
    private readonly journalTemplatesService: JournalTemplatesService,
  ) {}

  create(payload: CreatePenerimaanModal, user: JWTClaim): Observable<any> {
    return from(
      this.journalTemplatesService.findFirstByJournalTypeId(
        payload.journalTypeId,
      ),
    ).pipe(
      switchMap((journalTemplate) => {
        const details: CreateJournalDetailDto[] =
          journalTemplate.journalTemplateDetails.map((detail) => ({
            coaCode: detail.coa.code,
            debit: detail.typeLedger === 'DEBIT' ? payload.nominal : 0,
            credit: detail.typeLedger === 'CREDIT' ? payload.nominal : 0,
            note: `Penerimaan Modal - ${detail.coa.name}`,
          }));

        const journalDto: CreateJournalDto = {
          code: `JN-${DateTime.now().toFormat('yy-MM')}-${
            Math.floor(Math.random() * 1000) + 1
          }`, // Unique code
          date: payload.tanggal,
          debtTotal: payload.nominal,
          creditTotal: payload.nominal,
          status: '1', // Status Jurnal
          journalTypeId: payload.journalTypeId,
          cageId: payload.cageId,
          siteId: payload.siteId,
          details,
        };

        return this.journalService.create(journalDto, user.id);
      }),
      switchMap((journal) => {
        if (!journal) {
          return throwError(() => new Error('Failed to create journal entry'));
        }

        return this.penerimaanModalRepo.create(payload);
      }),
      catchError((err) => {
        console.error('Error while creating penerimaan modal:', err.message);
        return throwError(() => err);
      }),
    );
  }

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.penerimaanModalRepo.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.penerimaanModalRepo.firstOrThrow({ id }));
  }

  update(id: string, payload: UpdatePenerimaanModalDTO) {
    return from(this.penerimaanModalRepo.update({ id }, payload));
  }

  destroy(id: string) {
    return from(this.penerimaanModalRepo.delete({ id }));
  }
}
