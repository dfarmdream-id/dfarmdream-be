import { Injectable } from '@nestjs/common';
import { CagesRepository } from '../repositories';
import { CreateChickenCagesDto, UpdateChickenCagesDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';
import { GetCageFilterDto } from '../dtos/get-cage.dto';

@Injectable()
export class ChickenCagesService {
  constructor(private readonly chickencageRepository: CagesRepository) {}

  public paginate(paginateDto: GetCageFilterDto, siteId?: string) {
    const where: Prisma.CageWhereInput = {
      deletedAt: null,
      siteId,
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

    if (paginateDto.siteId) {
      Object.assign(where, {
        siteId: {
          in: paginateDto.siteId.split(','),
        },
      } as Prisma.CageWhereInput);
    }

    return from(
      this.chickencageRepository.paginate(paginateDto, {
        include: {
          site: true,
          CctvCamera: {
            where: {
              deletedAt: null,
            },
          },
        },
        where,
        orderBy: {
          createdAt: 'desc',
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
