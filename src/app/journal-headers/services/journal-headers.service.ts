import { Injectable } from '@nestjs/common';
import { JournalHeadersRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalHeadersDto, UpdateJournalHeadersDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class JournalHeadersService {
  constructor(
    private readonly journalheaderRepository: JournalHeadersRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.journalheaderRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.journalheaderRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.journalheaderRepository.delete({ id }));
  }

  public create(
    createJournalHeadersDto: CreateJournalHeadersDto,
    userId: string,
  ) {
    return from(
      this.journalheaderRepository.create({
        creditTotal: createJournalHeadersDto.creditTotal,
        date: createJournalHeadersDto.date,
        debtTotal: createJournalHeadersDto.debtTotal,
        journalType: {
          connect: {
            id: createJournalHeadersDto.journalTypeId,
          },
        },
        status: '',
        user: { connect: { id: userId } },
      }),
    );
  }

  public update(id: string, updateJournalHeadersDto: UpdateJournalHeadersDto) {
    return from(
      this.journalheaderRepository.update({ id }, updateJournalHeadersDto),
    );
  }
}
