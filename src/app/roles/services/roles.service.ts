import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateRolesDto, UpdateRolesDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RolesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    let where: Prisma.RoleWhereInput = {
      deletedAt: null,
    };

    if (paginateDto.q && paginateDto.q != '') {
      where = {
        ...where,
        OR: [
          {
            name: {
              contains: paginateDto.q,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    return from(
      this.roleRepository.paginate(paginateDto, {
        where: {
          ...where,
        },
        include: {
          permissions: {
            include: {
              permission: true,
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
    return from(
      this.roleRepository.firstOrThrow(
        { id },
        {
          permissions: true,
        },
      ),
    );
  }

  public destroy(id: string) {
    return from(this.roleRepository.delete({ id }));
  }

  public create(createRolesDto: CreateRolesDto) {
    return from(
      this.roleRepository.create({
        name: createRolesDto.name,
        permissions: {
          createMany: {
            data: createRolesDto.permissions,
          },
        },
      }),
    );
  }

  public update(id: string, updateRolesDto: UpdateRolesDto) {
    return from(
      this.roleRepository.update(
        { id },
        {
          name: updateRolesDto.name,
          permissions: {
            deleteMany: {},
            createMany: {
              data: updateRolesDto.permissions || [],
              skipDuplicates: true,
            },
          },
        },
      ),
    );
  }
}
