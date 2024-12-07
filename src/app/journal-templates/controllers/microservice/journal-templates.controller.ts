import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  JournalTemplatesRepository,
  type Filter,
} from 'src/app/journal-templates/repositories';
import { JournalTemplatesService } from 'src/app/journal-templates/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateJournalTemplatesDto,
  UpdateJournalTemplatesDto,
} from 'src/app/journal-templates/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JournalTemplates')
@Controller({
  path: 'journaltemplate',
  version: '1',
})
export class JournalTemplatesMicroserviceController {
  constructor(
    private readonly journaltemplateService: JournalTemplatesService,
    private readonly journaltemplateRepository: JournalTemplatesRepository,
  ) {}

  @MessagePattern('journaltemplate.create')
  public create(
    @Payload() createJournalTemplatesDto: CreateJournalTemplatesDto,
  ) {
    return from(
      this.journaltemplateService.create(createJournalTemplatesDto),
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

  @MessagePattern('journaltemplate.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.journaltemplateRepository.find(filter)).pipe(
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

  @MessagePattern('journaltemplate.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.journaltemplateService.paginate(paginateDto)).pipe(
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

  @MessagePattern('journaltemplate.detail')
  public detail(@Payload('id') id: string) {
    return from(this.journaltemplateService.detail(id)).pipe(
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

  @MessagePattern('journaltemplate.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.journaltemplateService.destroy(id)).pipe(
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
    @Payload() updateJournalTemplatesDto: UpdateJournalTemplatesDto,
  ) {
    return from(
      this.journaltemplateService.update(id, updateJournalTemplatesDto),
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
