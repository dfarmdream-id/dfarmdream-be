import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  CagesRepository,
  type Filter,
} from 'src/app/chicken-cages/repositories';
import { ChickenCagesService } from 'src/app/chicken-cages/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateChickenCagesDto,
  UpdateChickenCagesDto,
} from 'src/app/chicken-cages/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ChickenCages')
@Controller({
  path: 'chickencage',
  version: '1',
})
export class ChickenCagesMicroserviceController {
  constructor(
    private readonly chickencageService: ChickenCagesService,
    private readonly chickencageRepository: CagesRepository,
  ) {}

  @MessagePattern('chickencage.create')
  public create(@Payload() createChickenCagesDto: CreateChickenCagesDto) {
    return from(this.chickencageService.create(createChickenCagesDto)).pipe(
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

  @MessagePattern('chickencage.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.chickencageRepository.find(filter)).pipe(
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

  @MessagePattern('chickencage.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.chickencageService.paginate(paginateDto)).pipe(
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

  @MessagePattern('chickencage.detail')
  public detail(@Payload('id') id: string) {
    return from(this.chickencageService.detail(id)).pipe(
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

  @MessagePattern('chickencage.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.chickencageService.destroy(id)).pipe(
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
    @Payload() updateChickenCagesDto: UpdateChickenCagesDto,
  ) {
    return from(this.chickencageService.update(id, updateChickenCagesDto)).pipe(
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
