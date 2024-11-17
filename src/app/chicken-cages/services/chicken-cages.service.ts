import { Injectable } from '@nestjs/common';
import { ChickenCagesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickenCagesDto, UpdateChickenCagesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class ChickenCagesService {
  constructor(private readonly chickencageRepository: ChickenCagesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.chickencageRepository.paginate(paginateDto, {
        include: {
          site: true,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.chickencageRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.chickencageRepository.delete({ id }));
  }

  public create(createChickenCagesDto: CreateChickenCagesDto) {
    return from(this.chickencageRepository.create(createChickenCagesDto));
  }

  public update(id: string, updateChickenCagesDto: UpdateChickenCagesDto) {
    return from(
      this.chickencageRepository.update({ id }, updateChickenCagesDto),
    );
  }
}
