import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BatchesRepository, type Filter } from 'src/app/batches/repositories';
import { BatchesService } from 'src/app/batches/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateBatchesDto, UpdateBatchesDto } from 'src/app/batches/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import {User} from "@app/auth/decorators";
import {JWTClaim} from "@app/auth/entity/jwt-claim.dto";

@ApiTags('Batches')
@Controller({
  path: 'batch',
  version: '1',
})
export class BatchesMicroserviceController {
  constructor(
    private readonly batchService: BatchesService,
    private readonly batchRepository: BatchesRepository,
  ) {}

  @MessagePattern('batch.create')
  public create(@Payload() createBatchesDto: CreateBatchesDto) {
    return from(this.batchService.create(createBatchesDto)).pipe(
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

  @MessagePattern('batch.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.batchRepository.find(filter)).pipe(
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

  @MessagePattern('batch.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto, @User() user: JWTClaim) {
    return from(this.batchService.paginate(paginateDto, user.siteId)).pipe(
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

  @MessagePattern('batch.detail')
  public detail(@Payload('id') id: string) {
    return from(this.batchService.detail(id)).pipe(
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

  @MessagePattern('batch.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.batchService.destroy(id)).pipe(
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
    @Payload() updateBatchesDto: UpdateBatchesDto,
  ) {
    return from(this.batchService.update(id, updateBatchesDto)).pipe(
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
