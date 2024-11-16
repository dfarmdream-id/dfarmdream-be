import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreatePermissionsDto, UpdatePermissionsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.permissionRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.permissionRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.permissionRepository.delete({ id }));
  }

  public create(createPermissionsDto: CreatePermissionsDto) {
    return from(this.permissionRepository.create(createPermissionsDto));
  }

  public update(id: string, updatePermissionsDto: UpdatePermissionsDto) {
    return from(this.permissionRepository.update({ id }, updatePermissionsDto));
  }
}
