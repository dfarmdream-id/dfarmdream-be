import { Injectable } from '@nestjs/common';
import { CageRacksRepository } from '../repositories';
import { CreateChickenCageRacksDto, UpdateChickenCageRacksDto } from '../dtos';
import { from } from 'rxjs';
import { GetCageRackDto } from '../dtos/get-cage-rack.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChickenCageRacksService {
  constructor(
    private readonly chickencagerackRepository: CageRacksRepository,
  ) {}

  public paginate(paginateDto: GetCageRackDto, siteId: string) {
    const { q, cageId } = paginateDto;

    // Base filter
    const w: Prisma.CageRackWhereInput = {
      cage: {
        siteId: siteId,
      },
    };

    // Filter berdasarkan `cageId`
    if (cageId) {
      Object.assign(w, {
        cageId,
      });
    }

    // Pencarian berdasarkan `q` untuk `name` dan `cage.name`
    if (q) {
      Object.assign(w, {
        OR: [
          { name: { contains: q, mode: 'insensitive' } }, // Pencarian di kolom `name`
          { cage: { name: { contains: q, mode: 'insensitive' } } }, // Pencarian di `cage.name`
        ],
      });
    }

    console.log('Generated Where Clause:', JSON.stringify(w, null, 2));

    return from(
      this.chickencagerackRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
          ...w,
        },
        include: {
          cage: {
            include: {
              site: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
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
