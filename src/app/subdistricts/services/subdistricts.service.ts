import { Injectable } from '@nestjs/common';
import { SubDistrictsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateSubDistrictsDto, UpdateSubDistrictsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class SubDistrictsService {
  constructor(private readonly subdistrictRepository: SubDistrictsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.subdistrictRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.subdistrictRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.subdistrictRepository.delete({ id }));
  }

  public create(createSubDistrictsDto: CreateSubDistrictsDto) {
    return from(
      this.subdistrictRepository.create({
        district: {
          connect: {
            id: createSubDistrictsDto.districtId,
          },
        },
        name: createSubDistrictsDto.name,
      }),
    );
  }

  public update(id: string, updateSubDistrictsDto: UpdateSubDistrictsDto) {
    return from(
      this.subdistrictRepository.update({ id }, updateSubDistrictsDto),
    );
  }
}
