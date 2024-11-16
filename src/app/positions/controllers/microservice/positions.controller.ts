import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  PositionsRepository,
  type Filter,
} from 'src/app/positions/repositories';
import { PositionsService } from 'src/app/positions/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreatePositionsDto, UpdatePositionsDto } from 'src/app/positions/dtos';
import { map, catchError } from 'rxjs/operators';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

@ApiTags('Positions')
@Controller({
  path: 'position',
  version: '1',
})
export class PositionsMicroserviceController {
  constructor(
    private readonly positionService: PositionsService,
    private readonly positionRepository: PositionsRepository,
  ) {}

  @MessagePattern('position.create')
  public create(@Payload() createPositionsDto: CreatePositionsDto) {
    return from(this.positionService.create(createPositionsDto)).pipe(
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

  @MessagePattern('position.find')
  public find(
    @Payload() filter: Omit<Filter, 'include'>,
  ): Observable<Prisma.PositionCreateInput[]> {
    return from(this.positionRepository.find(filter)).pipe(
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

  @MessagePattern('position.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.positionService.paginate(paginateDto)).pipe(
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

  @MessagePattern('position.detail')
  public detail(@Payload('id') id: string) {
    return from(this.positionService.detail(id)).pipe(
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

  @MessagePattern('position.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.positionService.destroy(id)).pipe(
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
    @Payload() updatePositionsDto: UpdatePositionsDto,
  ) {
    return from(this.positionService.update(id, updatePositionsDto)).pipe(
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
