import { Injectable } from '@nestjs/common';
import { CageRacksRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickenCageRacksDto, UpdateChickenCageRacksDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class ChickenCageRacksService {
  constructor(
    private readonly chickencagerackRepository: CageRacksRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.chickencagerackRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
        include: {
          cage: {
            include: {
              site: true,
            },
          },
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.chickencagerackRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.chickencagerackRepository.delete({ id }));
  }

  public create(createChickenCageRacksDto: CreateChickenCageRacksDto) {
    return from(
      this.chickencagerackRepository.create({
        name: createChickenCageRacksDto.name,
        cage: {
          connect: {
            id: createChickenCageRacksDto.cageId,
          },
        },
      }),
    );
  }

  public update(
    id: string,
    updateChickenCageRacksDto: UpdateChickenCageRacksDto,
  ) {
    return from(
      this.chickencagerackRepository.update({ id }, updateChickenCageRacksDto),
    );
  }
}
