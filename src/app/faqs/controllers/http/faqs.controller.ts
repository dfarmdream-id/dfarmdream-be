import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FaqsService } from 'src/app/faqs/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateFaqsDto, UpdateFaqsDto } from 'src/app/faqs/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { User } from '@src/app/auth/decorators';
import { User as Auth } from '@prisma/client';
import { AuthGuard } from '@src/app/auth';

@ApiTags('Faqs')
@Controller({
  path: 'faq',
  version: '1',
})
export class FaqsHttpController {
  constructor(private readonly faqService: FaqsService) {}

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post()
  public create(@Body() createFaqsDto: CreateFaqsDto, @User() user: Auth) {
    return this.faqService.create(createFaqsDto, user.id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        console.log(
          '🦖 ~ file: faqs.controller.ts:39 ~ FaqsHttpController ~ catchError ~ error:',
          error,
        );
        console.log(
          '🦖 ----------------------------------------------------------------------------------🦖',
        );
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
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

  @Delete(':id')
  public destroy(@Param('id') id: string) {
    return this.faqService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() updateFaqsDto: UpdateFaqsDto) {
    return this.faqService.update(id, updateFaqsDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
