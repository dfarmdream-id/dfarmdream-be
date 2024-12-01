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
import { CoasService } from 'src/app/coas/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateCoasDto, UpdateCoasDto } from 'src/app/coas/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';

@ApiTags('Coas')
@Controller({
  path: 'coa',
  version: '1',
})
export class CoasHttpController {
  constructor(private readonly coaService: CoasService) {}

  @Post()
  public create(@Body() createCoasDto: CreateCoasDto): Observable<ResponseEntity> {
    return this.coaService.create(createCoasDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get()
  public index(@Query() paginateDto: PaginationQueryDto): Observable<ResponseEntity> {
    return this.coaService.paginate(paginateDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.coaService.detail(id).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.coaService.destroy(id).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateCoasDto: UpdateCoasDto,
  ): Observable<ResponseEntity> {
    return this.coaService.update(id, updateCoasDto).pipe(
      map(data => new ResponseEntity({ data, message: 'success' })),
      catchError(error => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}

