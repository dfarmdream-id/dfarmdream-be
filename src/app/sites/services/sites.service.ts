import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateSitesDto, UpdateSitesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class SitesService {
  constructor(private readonly siteRepository: SitesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.siteRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.siteRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.siteRepository.delete({ id }));
  }

  public create(createSitesDto: CreateSitesDto) {
    return from(
      this.siteRepository.create({
        name: createSitesDto.name,
        city: {
          connect: {
            id: createSitesDto.cityId,
          },
        },
        province: {
          connect: {
            id: createSitesDto.provinceId,
          },
        },
        district: {
          connect: {
            id: createSitesDto.districtId,
          },
        },
        subDistrict: {
          connect: {
            id: createSitesDto.subDistrictId,
          },
        },
        address: createSitesDto.address,
      }),
    );
  }

  public update(id: string, updateSitesDto: UpdateSitesDto) {
    return from(this.siteRepository.update({ id }, updateSitesDto));
  }
}
