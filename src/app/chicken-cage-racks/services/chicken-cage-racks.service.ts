import { Injectable, NotFoundException } from '@nestjs/common';
import { CageRacksRepository } from '../repositories';
import { CreateChickenCageRacksDto, UpdateChickenCageRacksDto } from '../dtos';
import { from, map } from 'rxjs';
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

    return from(
      this.chickencagerackRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
          ...w,
        },
        include: {
          batch: true,
          cage: {
            include: {
              site: true,
            },
          },
        },
        orderBy: {
          code: 'asc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.chickencagerackRepository
        .find({
          where: {
            id,
          },
          include: {
            batch: true,
            cage: {
              include: {
                site: true,
              },
            },
          },
        })
        .pipe(
          map((data) => {
            if (!data) {
              throw new NotFoundException('Data tidak ditemukan');
            }

            return data[0];
          }),
        ),
    );
  }

  public destroy(id: string) {
    return from(this.chickencagerackRepository.delete({ id }));
  }

  public create(createChickenCageRacksDto: CreateChickenCageRacksDto) {
    const dateNow = createChickenCageRacksDto.createdAt
      ? new Date(createChickenCageRacksDto.createdAt).toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta',
        })
      : new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta',
        });
    return from(
      this.chickencagerackRepository.create({
        name: createChickenCageRacksDto.name,
        cage: {
          connect: {
            id: createChickenCageRacksDto.cageId,
          },
        },
        createdAt: new Date(dateNow).toISOString(), // Konversi ke ISO-8601
        updatedAt: new Date(dateNow).toISOString(), // Konversi ke ISO-8601
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
