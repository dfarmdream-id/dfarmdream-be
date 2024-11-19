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
import { WarehouseTransactionsService } from 'src/app/warehouse-transactions/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateWarehouseTransactionsDto,
  UpdateWarehouseTransactionsDto,
} from 'src/app/warehouse-transactions/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@src/app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('WarehouseTransactions')
@Controller({
  path: 'warehouse-transaction',
  version: '1',
})
export class WarehouseTransactionsHttpController {
  constructor(
    private readonly warehousetransactionService: WarehouseTransactionsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createWarehouseTransactionsDto: CreateWarehouseTransactionsDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.warehousetransactionService
      .create(createWarehouseTransactionsDto, user.id, user.siteId)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          console.log(error);
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }

  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return this.warehousetransactionService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.warehousetransactionService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.warehousetransactionService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateWarehouseTransactionsDto: UpdateWarehouseTransactionsDto,
  ): Observable<ResponseEntity> {
    return this.warehousetransactionService
      .update(id, updateWarehouseTransactionsDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}
