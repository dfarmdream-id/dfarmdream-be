import { Injectable } from '@nestjs/common';
import { PositionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreatePositionsDto, UpdatePositionsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class PositionsService {
  constructor(private readonly positionRepository: PositionsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.positionRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.positionRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.positionRepository.delete({ id }));
  }

  public create(createPositionsDto: CreatePositionsDto) {
    return from(this.positionRepository.create(createPositionsDto));
  }

  public update(id: string, updatePositionsDto: UpdatePositionsDto) {
    return from(this.positionRepository.update({ id }, updatePositionsDto));
  }
}
