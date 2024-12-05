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
import { CashFlowCategoriesService } from 'src/app/cash-flow-categories/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateCashFlowCategoriesDto,
  UpdateCashFlowCategoriesDto,
} from 'src/app/cash-flow-categories/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('CashFlowCategories')
@Controller({
  path: 'cash-flow-category',
  version: '1',
})
export class CashFlowCategoriesHttpController {
  constructor(
    private readonly cashflowcategoryService: CashFlowCategoriesService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createCashFlowCategoriesDto: CreateCashFlowCategoriesDto,
  ): Observable<ResponseEntity> {
    return this.cashflowcategoryService
      .create(createCashFlowCategoriesDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.cashflowcategoryService.paginate(paginateDto, user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.cashflowcategoryService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.cashflowcategoryService.destroy(id).pipe(
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
    @Body() updateCashFlowCategoriesDto: UpdateCashFlowCategoriesDto,
  ): Observable<ResponseEntity> {
    return this.cashflowcategoryService
      .update(id, updateCashFlowCategoriesDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}
