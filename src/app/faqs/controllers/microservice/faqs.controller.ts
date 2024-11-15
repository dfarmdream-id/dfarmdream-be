import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { FaqsRepository, type Filter } from 'src/app/faqs/repositories';
import { FaqsService } from 'src/app/faqs/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateFaqsDto, UpdateFaqsDto } from 'src/app/faqs/dtos';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Faqs')
@Controller({
  path: 'faq',
  version: '1',
})
export class FaqsMicroserviceController {
  constructor(
    private readonly faqService: FaqsService,
    private readonly faqRepository: FaqsRepository,
  ) {}

  @MessagePattern('faq.create')
  public create(
    @Payload() createFaqsDto: CreateFaqsDto,
  ): Observable<ResponseEntity> {
    return from(this.faqService.create(createFaqsDto)).pipe(
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

  @MessagePattern('faq.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.faqRepository.find(filter)).pipe(
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

  @MessagePattern('faq.paginate')
  public index(
    @Payload() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return from(this.faqService.paginate(paginateDto)).pipe(
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

  @MessagePattern('faq.detail')
  public detail(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.faqService.detail(id)).pipe(
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

  @MessagePattern('faq.destroy')
  public destroy(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.faqService.destroy(id)).pipe(
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
    @Payload() updateFaqsDto: UpdateFaqsDto,
  ): Observable<ResponseEntity> {
    return from(this.faqService.update(id, updateFaqsDto)).pipe(
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
