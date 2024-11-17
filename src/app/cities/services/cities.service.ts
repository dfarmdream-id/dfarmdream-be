import { Injectable } from '@nestjs/common';
import { CitiesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCitiesDto, UpdateCitiesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class CitiesService {
  constructor(private readonly cityRepository: CitiesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.cityRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.cityRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.cityRepository.delete({ id }));
  }

  public create(createCitiesDto: CreateCitiesDto) {
    return from(
      this.cityRepository.create({
        name: createCitiesDto.name,
        province: {
          connect: {
            id: createCitiesDto.provinceId,
          },
        },
      }),
    );
  }

  public update(id: string, updateCitiesDto: UpdateCitiesDto) {
    return from(this.cityRepository.update({ id }, updateCitiesDto));
  }
}
