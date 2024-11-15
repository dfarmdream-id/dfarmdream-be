import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FilesRepository, type Filter } from 'src/app/files/repositories';
import { FilesService } from 'src/app/files/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateFilesDto, UpdateFilesDto } from 'src/app/files/dtos';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller({
  path: 'file',
  version: '1',
})
export class FilesMicroserviceController {
  constructor(
    private readonly fileService: FilesService,
    private readonly fileRepository: FilesRepository,
  ) {}

  @MessagePattern('file.create')
  public create(
    @Payload() createFilesDto: CreateFilesDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.create(createFilesDto)).pipe(
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

  @MessagePattern('file.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.fileRepository.find(filter)).pipe(
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

  @MessagePattern('file.paginate')
  public index(
    @Payload() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.paginate(paginateDto)).pipe(
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

  @MessagePattern('file.detail')
  public detail(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.fileService.detail(id)).pipe(
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

  @MessagePattern('file.destroy')
  public destroy(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.fileService.destroy(id)).pipe(
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
    @Payload() updateFilesDto: UpdateFilesDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.update(id, updateFilesDto)).pipe(
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
