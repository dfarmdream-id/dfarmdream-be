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
import { TransactionsService } from 'src/app/transactions/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateTransactionsDto,
  UpdateTransactionsDto,
} from 'src/app/transactions/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@src/app/auth/decorators';

@ApiTags('Transactions')
@Controller({
  path: 'transaction',
  version: '1',
})
export class TransactionsHttpController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createTransactionsDto: CreateTransactionsDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.transactionService
      .create(createTransactionsDto, user.id, user.siteId)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }

  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return this.transactionService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.transactionService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.transactionService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTransactionsDto: UpdateTransactionsDto,
  ): Observable<ResponseEntity> {
    return this.transactionService.update(id, updateTransactionsDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
