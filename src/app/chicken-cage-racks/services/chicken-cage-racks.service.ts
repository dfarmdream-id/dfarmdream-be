import { Injectable } from '@nestjs/common';
import { CageRacksRepository } from '../repositories';
import { CreateChickenCageRacksDto, UpdateChickenCageRacksDto } from '../dtos';
import { from } from 'rxjs';
import { GetCageRackDto } from '../dtos/get-cage-rack.dto';

@Injectable()
export class ChickenCageRacksService {
  constructor(
    private readonly chickencagerackRepository: CageRacksRepository,
  ) {}

  public paginate(paginateDto: GetCageRackDto) {
    const w = {};

    if (paginateDto.cageId) {
      Object.assign(w, {
        cageId: paginateDto.cageId,
      });
    }

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
