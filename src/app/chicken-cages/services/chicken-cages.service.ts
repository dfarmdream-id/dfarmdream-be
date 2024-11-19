import { Injectable } from '@nestjs/common';
import { CagesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickenCagesDto, UpdateChickenCagesDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChickenCagesService {
  constructor(private readonly chickencageRepository: CagesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    const where: Prisma.CageWhereInput = {
      deletedAt: null,
    };

    if (paginateDto.q) {
      Object.assign(where, {
        OR: [
          {
            name: {
              contains: paginateDto.q,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      } as Prisma.CageWhereInput);
    }

    return from(
      this.chickencageRepository.paginate(paginateDto, {
        include: {
          site: true,
        },
        where,
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
