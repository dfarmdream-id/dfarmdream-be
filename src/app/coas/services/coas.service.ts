import { Injectable } from '@nestjs/common';
import { CoasRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCoasDto, UpdateCoasDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class CoasService {
  constructor(private readonly coaRepository: CoasRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.coaRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.coaRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.coaRepository.delete({ id }));
  }

  public create(createCoasDto: CreateCoasDto) {
    return from(
      this.coaRepository.create({
        code: createCoasDto.code,
        isBalanceSheet: createCoasDto.isBalanceSheet,
        name: createCoasDto.name,
        isRetainedEarnings: createCoasDto.isRetainedEarnings,
        level: createCoasDto.level,
      }),
    );
  }

  public update(id: string, updateCoasDto: UpdateCoasDto) {
    return from(this.coaRepository.update({ id }, updateCoasDto));
  }
}
