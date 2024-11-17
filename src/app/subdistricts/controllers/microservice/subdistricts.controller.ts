import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  SubDistrictsRepository,
  type Filter,
} from 'src/app/subdistricts/repositories';
import { SubDistrictsService } from 'src/app/subdistricts/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateSubDistrictsDto,
  UpdateSubDistrictsDto,
} from 'src/app/subdistricts/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SubDistricts')
@Controller({
  path: 'subdistrict',
  version: '1',
})
export class SubDistrictsMicroserviceController {
  constructor(
    private readonly subdistrictService: SubDistrictsService,
    private readonly subdistrictRepository: SubDistrictsRepository,
  ) {}

  @MessagePattern('subdistrict.create')
  public create(@Payload() createSubDistrictsDto: CreateSubDistrictsDto) {
    return from(this.subdistrictService.create(createSubDistrictsDto)).pipe(
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

  @MessagePattern('subdistrict.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.subdistrictRepository.find(filter)).pipe(
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

  @MessagePattern('subdistrict.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.subdistrictService.paginate(paginateDto)).pipe(
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

  @MessagePattern('subdistrict.detail')
  public detail(@Payload('id') id: string) {
    return from(this.subdistrictService.detail(id)).pipe(
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

  @MessagePattern('subdistrict.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.subdistrictService.destroy(id)).pipe(
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
    @Payload() updateSubDistrictsDto: UpdateSubDistrictsDto,
  ) {
    return from(this.subdistrictService.update(id, updateSubDistrictsDto)).pipe(
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
