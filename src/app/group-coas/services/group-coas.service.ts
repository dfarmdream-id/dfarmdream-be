import { Injectable } from '@nestjs/common';
import { GroupCoasRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateGroupCoasDto, UpdateGroupCoasDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class GroupCoasService {
  constructor(private readonly groupcoaRepository: GroupCoasRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.groupcoaRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.groupcoaRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.groupcoaRepository.delete({ id }));
  }

  public create(createGroupCoasDto: CreateGroupCoasDto) {
    return from(this.groupcoaRepository.create(createGroupCoasDto));
  }

  public update(id: string, updateGroupCoasDto: UpdateGroupCoasDto) {
    return from(this.groupcoaRepository.update({ id }, updateGroupCoasDto));
  }
}
