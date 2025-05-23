import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateSitesDto, UpdateSitesDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/platform/database/services/prisma.service';

@Injectable()
export class SitesService {
  constructor(
    private readonly siteRepository: SitesRepository,
    private readonly prisma: PrismaService,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    const where: Prisma.SiteWhereInput = {
      deletedAt: null,
    };
    if (paginateDto.q) {
      Object.assign(where, {
        OR: [
          {
            name: {
              contains: paginateDto.q,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      } as Prisma.SiteWhereInput);
    }

    return from(
      this.siteRepository.paginate(paginateDto, {
        where,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.siteRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(
      this.prisma.$transaction(async (prisma) => {
        // Hapus data dari userSites yang terkait dengan site
        await prisma.userSite.deleteMany({
          where: {
            siteId: id, // Menghapus userSites dengan siteId yang cocok
          },
        });

        // Hapus data dari sites
        return prisma.site.delete({
          where: {
            id, // Hapus site berdasarkan id
          },
        });
      }),
    );
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
