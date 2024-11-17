import { Injectable } from '@nestjs/common';
import { DistrictsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateDistrictsDto, UpdateDistrictsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class DistrictsService {
  constructor(private readonly districtRepository: DistrictsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.districtRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.districtRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.districtRepository.delete({ id }));
  }

  public create(createDistrictsDto: CreateDistrictsDto) {
    return from(
      this.districtRepository.create({
        name: createDistrictsDto.name,
        city: {
          connect: {
            id: createDistrictsDto.cityId,
          },
        },
      }),
    );
  }

  public update(id: string, updateDistrictsDto: UpdateDistrictsDto) {
    return from(this.districtRepository.update({ id }, updateDistrictsDto));
  }
}
