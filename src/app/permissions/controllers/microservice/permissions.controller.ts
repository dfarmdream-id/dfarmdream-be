import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  PermissionsRepository,
  type Filter,
} from 'src/app/permissions/repositories';
import { PermissionsService } from 'src/app/permissions/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreatePermissionsDto,
  UpdatePermissionsDto,
} from 'src/app/permissions/dtos';
import { map, catchError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

@ApiTags('Permissions')
@Controller({
  path: 'permission',
  version: '1',
})
export class PermissionsMicroserviceController {
  constructor(
    private readonly permissionService: PermissionsService,
    private readonly permissionRepository: PermissionsRepository,
  ) {}

  @MessagePattern('permission.create')
  public create(@Payload() createPermissionsDto: CreatePermissionsDto) {
    return from(this.permissionService.create(createPermissionsDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('permission.find')
  public find(
    @Payload() filter: Omit<Filter, 'include'>,
  ): Observable<Prisma.PermissionWhereInput[]> {
    return from(this.permissionRepository.find(filter)).pipe(
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('permission.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.permissionService.paginate(paginateDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('permission.detail')
  public detail(@Payload('id') id: string) {
    return from(this.permissionService.detail(id)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('permission.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.permissionService.destroy(id)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern(':id')
  public update(
    @Payload('id') id: string,
    @Payload() updatePermissionsDto: UpdatePermissionsDto,
  ) {
    return from(this.permissionService.update(id, updatePermissionsDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }
}
