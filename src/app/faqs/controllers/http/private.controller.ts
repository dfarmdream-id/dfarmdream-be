import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { FaqsService } from 'src/app/faqs/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';

@ApiTags('[Public] Faqs')
@Controller({
  path: '/public/faq',
  version: '1',
})
export class FaqsPublicHttpController {
  constructor(private readonly faqService: FaqsService) {}

  @Get()
  public index(@Query() paginateDto: PaginationQueryDto) {
    return this.faqService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        console.log(
          '🦖 ~ file: faqs.controller.ts:51 ~ FaqsHttpController ~ catchError ~ error:',
          error,
        );
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string) {
    return this.faqService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        console.log(
          '🦖 ~ file: faqs.controller.ts:71 ~ FaqsHttpController ~ catchError ~ error:',
          error,
        );
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }
}
