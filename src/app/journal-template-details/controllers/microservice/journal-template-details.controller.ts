import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { JournalTemplateDetailsRepository, type Filter } from 'src/app/journal-template-details/repositories';
import { JournalTemplateDetailsService } from 'src/app/journal-template-details/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateJournalTemplateDetailsDto, UpdateJournalTemplateDetailsDto } from 'src/app/journal-template-details/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JournalTemplateDetails')
@Controller({
  path: 'journaltemplatedetail',
  version: '1',
})
export class JournalTemplateDetailsMicroserviceController {
  constructor(
    private readonly journaltemplatedetailService: JournalTemplateDetailsService,
    private readonly journaltemplatedetailRepository: JournalTemplateDetailsRepository,
  ) {}

  @MessagePattern('journaltemplatedetail.create')
  public create(@Payload() createJournalTemplateDetailsDto: CreateJournalTemplateDetailsDto) {
    return from(this.journaltemplatedetailService.create(createJournalTemplateDetailsDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => { 
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('journaltemplatedetail.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.journaltemplatedetailRepository.find(filter)).pipe(
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('journaltemplatedetail.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.journaltemplatedetailService.paginate(paginateDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('journaltemplatedetail.detail')
  public detail(@Payload('id') id: string) {
    return from(this.journaltemplatedetailService.detail(id)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('journaltemplatedetail.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.journaltemplatedetailService.destroy(id)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern(':id')
  public update(
    @Payload('id') id: string,
    @Payload() updateJournalTemplateDetailsDto: UpdateJournalTemplateDetailsDto,
  ) {
    return from(this.journaltemplatedetailService.update(id, updateJournalTemplateDetailsDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }
}

