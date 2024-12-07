import { Injectable } from '@nestjs/common';
import { JournalTypesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateJournalTypesDto, UpdateJournalTypesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class JournalTypesService {
  constructor(private readonly journaltypeRepository: JournalTypesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.journaltypeRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.journaltypeRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.journaltypeRepository.delete({ id }));
  }

  public create(createJournalTypesDto: CreateJournalTypesDto) {
    return from(this.journaltypeRepository.create(createJournalTypesDto));
  }

  public update(id: string, updateJournalTypesDto: UpdateJournalTypesDto) {
    return from(
      this.journaltypeRepository.update({ id }, updateJournalTypesDto),
    );
  }
}
