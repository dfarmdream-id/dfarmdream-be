import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ChickensRepository, type Filter } from 'src/app/chickens/repositories';
import { ChickensService } from 'src/app/chickens/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateChickensDto, UpdateChickensDto } from 'src/app/chickens/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chickens')
@Controller({
  path: 'chicken',
  version: '1',
})
export class ChickensMicroserviceController {
  constructor(
    private readonly chickenService: ChickensService,
    private readonly chickenRepository: ChickensRepository,
  ) {}

  @MessagePattern('chicken.create')
  public create(@Payload() createChickensDto: CreateChickensDto) {
    return from(this.chickenService.create(createChickensDto)).pipe(
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

  @MessagePattern('chicken.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.chickenRepository.find(filter)).pipe(
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

  @MessagePattern('chicken.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(
      this.chickenService.paginate(paginateDto, '', '', '', '', '', '', ''),
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

  @MessagePattern('chicken.detail')
  public detail(@Payload('id') id: string) {
    return from(this.chickenService.detail(id)).pipe(
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

  @MessagePattern('chicken.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.chickenService.destroy(id)).pipe(
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
    @Payload() updateChickensDto: UpdateChickensDto,
  ) {
    return from(this.chickenService.update(id, updateChickensDto)).pipe(
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
