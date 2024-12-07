import { Injectable } from '@nestjs/common';
import { JournalTemplatesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalTemplatesDto, UpdateJournalTemplatesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class JournalTemplatesService {
  constructor(
    private readonly journaltemplateRepository: JournalTemplatesRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.journaltemplateRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.journaltemplateRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.journaltemplateRepository.delete({ id }));
  }

  public create(createJournalTemplatesDto: CreateJournalTemplatesDto) {
    return from(
      this.journaltemplateRepository.create(createJournalTemplatesDto),
    );
  }

  public update(
    id: string,
    updateJournalTemplatesDto: UpdateJournalTemplatesDto,
  ) {
    return from(
      this.journaltemplateRepository.update({ id }, updateJournalTemplatesDto),
    );
  }
}
