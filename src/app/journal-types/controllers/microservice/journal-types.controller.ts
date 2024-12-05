import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  JournalTypesRepository,
  type Filter,
} from 'src/app/journal-types/repositories';
import { JournalTypesService } from 'src/app/journal-types/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateJournalTypesDto,
  UpdateJournalTypesDto,
} from 'src/app/journal-types/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JournalTypes')
@Controller({
  path: 'journaltype',
  version: '1',
})
export class JournalTypesMicroserviceController {
  constructor(
    private readonly journaltypeService: JournalTypesService,
    private readonly journaltypeRepository: JournalTypesRepository,
  ) {}

  @MessagePattern('journaltype.create')
  public create(@Payload() createJournalTypesDto: CreateJournalTypesDto) {
    return from(this.journaltypeService.create(createJournalTypesDto)).pipe(
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

  @MessagePattern('journaltype.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.journaltypeRepository.find(filter)).pipe(
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

  @MessagePattern('journaltype.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.journaltypeService.paginate(paginateDto)).pipe(
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

  @MessagePattern('journaltype.detail')
  public detail(@Payload('id') id: string) {
    return from(this.journaltypeService.detail(id)).pipe(
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

  @MessagePattern('journaltype.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.journaltypeService.destroy(id)).pipe(
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
    @Payload() updateJournalTypesDto: UpdateJournalTypesDto,
  ) {
    return from(this.journaltypeService.update(id, updateJournalTypesDto)).pipe(
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
