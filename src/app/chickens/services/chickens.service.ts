import { Injectable } from '@nestjs/common';
import { ChickensRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickensDto, UpdateChickensDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChickensService {
  constructor(private readonly chickenRepository: ChickensRepository) {}

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    const { q } = paginateDto;

    // Filter `OR` conditions dynamically
    const searchConditions: Prisma.ChickenWhereInput[] = [];

    if (q) {
      searchConditions.push(
        { name: { contains: q, mode: 'insensitive' } }, // Pencarian pada kolom `name`
        { rack: { name: { contains: q, mode: 'insensitive' } } }, // Pencarian pada `rack.name`
        { rack: { cage: { name: { contains: q, mode: 'insensitive' } } } }, // Pencarian pada `cage.name`
      );
    }

    const where: Prisma.ChickenWhereInput = {
      deletedAt: null,
      rack: {
        cage: {
          siteId,
        },
      },
      ...(searchConditions.length > 0 && { OR: searchConditions }), // Tambahkan kondisi `OR` jika ada
    };

    return from(
      this.chickenRepository.paginate(paginateDto, {
        where,
        include: {
          rack: {
            include: {
              cage: true,
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
    return from(this.chickenRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.chickenRepository.delete({ id }));
  }

  public create(createChickensDto: CreateChickensDto) {
    return from(this.chickenRepository.create(createChickensDto));
  }

  public update(id: string, updateChickensDto: UpdateChickensDto) {
    return from(this.chickenRepository.update({ id }, updateChickensDto));
  }
}
