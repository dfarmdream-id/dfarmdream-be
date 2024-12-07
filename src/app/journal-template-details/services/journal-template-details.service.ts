import { Injectable } from '@nestjs/common';
import { JournalTemplateDetailsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateJournalTemplateDetailsDto,
  UpdateJournalTemplateDetailsDto,
} from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class JournalTemplateDetailsService {
  constructor(
    private readonly journaltemplatedetailRepository: JournalTemplateDetailsRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.journaltemplatedetailRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.journaltemplatedetailRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.journaltemplatedetailRepository.delete({ id }));
  }

  public create(
    createJournalTemplateDetailsDto: CreateJournalTemplateDetailsDto,
  ) {
    return from(
      this.journaltemplatedetailRepository.create(
        createJournalTemplateDetailsDto,
      ),
    );
  }

  public update(
    id: string,
    updateJournalTemplateDetailsDto: UpdateJournalTemplateDetailsDto,
  ) {
    return from(
      this.journaltemplatedetailRepository.update(
        { id },
        updateJournalTemplateDetailsDto,
      ),
    );
  }
}
