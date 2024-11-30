import { Injectable } from '@nestjs/common';
import { ChickensRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickensDto, UpdateChickensDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class ChickensService {
  constructor(private readonly chickenRepository: ChickensRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.chickenRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
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
