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
import { catchError, map, Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@src/app/auth/decorators';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';

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

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
    @Query('batchId') batchId: string,
    @Query('cageId') cageId: string,
    @Query('dateRangeFilter') dateRange: string,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.warehousetransactionService
      .paginate(paginateDto, user.siteId, {
        batchId,
        cageId,
        dateRange,
      })
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Post('cashier/:id')
  public submitToCashier(
    @Param('id') id: string,
    @Body() body: { typeSell: string; typeCash: string; dateCreated: string },
    @User() user: JWTClaim,
  ) {
    return this.warehousetransactionService.sendToCashier(
      id,
      {
        typeSell: body.typeSell,
        typeCash: body.typeCash,
        dateCreated: body.dateCreated,
      },
      user,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.warehousetransactionService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.warehousetransactionService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateWarehouseTransactionsDto: UpdateWarehouseTransactionsDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.warehousetransactionService
      .update(id, updateWarehouseTransactionsDto, user.id)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}

@ApiTags('WarehouseTransactions')
@Controller({
  path: 'public/warehouse-transaction',
  version: '1',
})
export class WarehouseTransactionsPublicHttpController {
  constructor(
    private readonly warehousetransactionService: WarehouseTransactionsService,
  ) {}

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.warehousetransactionService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }
}
