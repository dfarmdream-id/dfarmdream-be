import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  GroupCoasRepository,
  type Filter,
} from 'src/app/group-coas/repositories';
import { GroupCoasService } from 'src/app/group-coas/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateGroupCoasDto,
  UpdateGroupCoasDto,
} from 'src/app/group-coas/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GroupCoas')
@Controller({
  path: 'groupcoa',
  version: '1',
})
export class GroupCoasMicroserviceController {
  constructor(
    private readonly groupcoaService: GroupCoasService,
    private readonly groupcoaRepository: GroupCoasRepository,
  ) {}

  @MessagePattern('groupcoa.create')
  public create(@Payload() createGroupCoasDto: CreateGroupCoasDto) {
    return from(this.groupcoaService.create(createGroupCoasDto)).pipe(
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

  @MessagePattern('groupcoa.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.groupcoaRepository.find(filter)).pipe(
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

  @MessagePattern('groupcoa.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.groupcoaService.paginate(paginateDto)).pipe(
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

  @MessagePattern('groupcoa.detail')
  public detail(@Payload('id') id: string) {
    return from(this.groupcoaService.detail(id)).pipe(
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

  @MessagePattern('groupcoa.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.groupcoaService.destroy(id)).pipe(
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
    @Payload() updateGroupCoasDto: UpdateGroupCoasDto,
  ) {
    return from(this.groupcoaService.update(id, updateGroupCoasDto)).pipe(
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
