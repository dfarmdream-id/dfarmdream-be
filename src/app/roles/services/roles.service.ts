import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateRolesDto, UpdateRolesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RolesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.roleRepository.paginate(paginateDto, {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.roleRepository.firstOrThrow({ id }));
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
          permissions: {
            set: updateRolesDto.permissions,
          },
        },
      ),
    );
  }
}
