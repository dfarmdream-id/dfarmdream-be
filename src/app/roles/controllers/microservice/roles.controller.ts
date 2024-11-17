import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RolesRepository, type Filter } from 'src/app/roles/repositories';
import { RolesService } from 'src/app/roles/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateRolesDto, UpdateRolesDto } from 'src/app/roles/dtos';
import { map, catchError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

@ApiTags('Roles')
@Controller({
  path: 'role',
  version: '1',
})
export class RolesMicroserviceController {
  constructor(
    private readonly roleService: RolesService,
    private readonly roleRepository: RolesRepository,
  ) {}

  @MessagePattern('role.create')
  public create(@Payload() createRolesDto: CreateRolesDto) {
    return from(this.roleService.create(createRolesDto)).pipe(
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

  @MessagePattern('role.find')
  public find(
    @Payload() filter: Omit<Filter, 'include'>,
  ): Observable<Prisma.RoleCreateInput[]> {
    return from(this.roleRepository.find(filter)).pipe(
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

  @MessagePattern('role.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.roleService.paginate(paginateDto)).pipe(
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

  @MessagePattern('role.detail')
  public detail(@Payload('id') id: string) {
    return from(this.roleService.detail(id)).pipe(
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

  @MessagePattern('role.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.roleService.destroy(id)).pipe(
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
    @Payload() updateRolesDto: UpdateRolesDto,
  ) {
    return from(this.roleService.update(id, updateRolesDto)).pipe(
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
