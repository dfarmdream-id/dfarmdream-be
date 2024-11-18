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
} from '@nestjs/common';
import { PricesService } from 'src/app/prices/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreatePricesDto, UpdatePricesDto } from 'src/app/prices/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';

@ApiTags('Prices')
@Controller({
  path: 'price',
  version: '1',
})
export class PricesHttpController {
  constructor(private readonly priceService: PricesService) {}

  @Post()
  public create(@Body() createPricesDto: CreatePricesDto): Observable<ResponseEntity> {
    return this.priceService.create(createPricesDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get()
  public index(@Query() paginateDto: PaginationQueryDto): Observable<ResponseEntity> {
    return this.priceService.paginate(paginateDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.priceService.detail(id).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.priceService.destroy(id).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updatePricesDto: UpdatePricesDto,
  ): Observable<ResponseEntity> {
    return this.priceService.update(id, updatePricesDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}

