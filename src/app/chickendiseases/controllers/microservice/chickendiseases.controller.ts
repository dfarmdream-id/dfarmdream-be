import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  ChickenDiseasesRepository,
  type Filter,
} from 'src/app/chickendiseases/repositories';
import { ChickenDiseasesService } from 'src/app/chickendiseases/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateChickenDiseasesDto,
  UpdateChickenDiseasesDto,
} from 'src/app/chickendiseases/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ChickenDiseases')
@Controller({
  path: 'chickendisease',
  version: '1',
})
export class ChickenDiseasesMicroserviceController {
  constructor(
    private readonly chickendiseaseService: ChickenDiseasesService,
    private readonly chickendiseaseRepository: ChickenDiseasesRepository,
  ) {}

  @MessagePattern('chickendisease.create')
  public create(@Payload() createChickenDiseasesDto: CreateChickenDiseasesDto) {
    return from(
      this.chickendiseaseService.create(createChickenDiseasesDto),
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

  @MessagePattern('chickendisease.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.chickendiseaseRepository.find(filter)).pipe(
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

  @MessagePattern('chickendisease.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.chickendiseaseService.paginate(paginateDto)).pipe(
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

  @MessagePattern('chickendisease.detail')
  public detail(@Payload('id') id: string) {
    return from(this.chickendiseaseService.detail(id)).pipe(
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

  @MessagePattern('chickendisease.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.chickendiseaseService.destroy(id)).pipe(
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
    @Payload() updateChickenDiseasesDto: UpdateChickenDiseasesDto,
  ) {
    return from(
      this.chickendiseaseService.update(id, updateChickenDiseasesDto),
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
