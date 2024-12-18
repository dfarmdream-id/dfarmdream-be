import { Injectable } from '@nestjs/common';
import { ChickenDiseasesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickenDiseasesDto, UpdateChickenDiseasesDto } from '../dtos';
import { from, Observable } from 'rxjs';

@Injectable()
export class ChickenDiseasesService {
  constructor(
    private readonly chickendiseaseRepository: ChickenDiseasesRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.chickendiseaseRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.chickendiseaseRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.chickendiseaseRepository.delete({ id }));
  }

  public create(createChickenDiseasesDto: CreateChickenDiseasesDto) {
    return from(this.chickendiseaseRepository.create(createChickenDiseasesDto));
  }

  public update(
    id: string,
    updateChickenDiseasesDto: UpdateChickenDiseasesDto,
  ) {
    return from(
      this.chickendiseaseRepository.update({ id }, updateChickenDiseasesDto),
    );
  }
}
