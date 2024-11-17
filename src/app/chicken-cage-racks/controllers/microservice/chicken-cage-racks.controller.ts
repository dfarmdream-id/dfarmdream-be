import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  ChickenCageRacksRepository,
  type Filter,
} from 'src/app/chicken-cage-racks/repositories';
import { ChickenCageRacksService } from 'src/app/chicken-cage-racks/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateChickenCageRacksDto,
  UpdateChickenCageRacksDto,
} from 'src/app/chicken-cage-racks/dtos';
import { map, catchError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';

@ApiTags('ChickenCageRacks')
@Controller({
  path: 'chickencagerack',
  version: '1',
})
export class ChickenCageRacksMicroserviceController {
  constructor(
    private readonly chickencagerackService: ChickenCageRacksService,
    private readonly chickencagerackRepository: ChickenCageRacksRepository,
  ) {}

  @MessagePattern('chickencagerack.create')
  public create(
    @Payload() createChickenCageRacksDto: CreateChickenCageRacksDto,
  ) {
    return from(
      this.chickencagerackService.create(createChickenCageRacksDto),
    ).pipe(
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

  @MessagePattern('chickencagerack.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.chickencagerackRepository.find(filter)).pipe(
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

  @MessagePattern('chickencagerack.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.chickencagerackService.paginate(paginateDto)).pipe(
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

  @MessagePattern('chickencagerack.detail')
  public detail(@Payload('id') id: string) {
    return from(this.chickencagerackService.detail(id)).pipe(
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

  @MessagePattern('chickencagerack.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.chickencagerackService.destroy(id)).pipe(
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
    @Payload() updateChickenCageRacksDto: UpdateChickenCageRacksDto,
  ) {
    return from(
      this.chickencagerackService.update(id, updateChickenCageRacksDto),
    ).pipe(
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
