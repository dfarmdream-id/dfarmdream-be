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
    const payload = {
      name: createSitesDto.name,
      address: createSitesDto.address,
    };

    if (createSitesDto.provinceId) {
      Object.assign(payload, {
        province: {
          connect: {
            id: createSitesDto.provinceId,
          },
        },
      });
    }

    if (createSitesDto.cityId) {
      Object.assign(payload, {
        city: {
          connect: {
            id: createSitesDto.cityId,
          },
        },
      });
    }

    if (createSitesDto.districtId) {
      Object.assign(payload, {
        district: {
          connect: {
            id: createSitesDto.districtId,
          },
        },
      });
    }

    if (createSitesDto.subDistrictId) {
      Object.assign(payload, {
        subDistrict: {
          connect: {
            id: createSitesDto.subDistrictId,
          },
        },
      });
    }

    return from(this.siteRepository.create(payload));
  }

  public update(id: string, updateSitesDto: UpdateSitesDto) {
    return from(this.siteRepository.update({ id }, updateSitesDto));
  }
}
