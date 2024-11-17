import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  ProvincesRepository,
  type Filter,
} from 'src/app/provinces/repositories';
import { ProvincesService } from 'src/app/provinces/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateProvincesDto, UpdateProvincesDto } from 'src/app/provinces/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provinces')
@Controller({
  path: 'province',
  version: '1',
})
export class ProvincesMicroserviceController {
  constructor(
    private readonly provinceService: ProvincesService,
    private readonly provinceRepository: ProvincesRepository,
  ) {}

  @MessagePattern('province.create')
  public create(@Payload() createProvincesDto: CreateProvincesDto) {
    return from(this.provinceService.create(createProvincesDto)).pipe(
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

  @MessagePattern('province.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.provinceRepository.find(filter)).pipe(
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

  @MessagePattern('province.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.provinceService.paginate(paginateDto)).pipe(
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

  @MessagePattern('province.detail')
  public detail(@Payload('id') id: string) {
    return from(this.provinceService.detail(id)).pipe(
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

  @MessagePattern('province.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.provinceService.destroy(id)).pipe(
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
    @Payload() updateProvincesDto: UpdateProvincesDto,
  ) {
    return from(this.provinceService.update(id, updateProvincesDto)).pipe(
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
