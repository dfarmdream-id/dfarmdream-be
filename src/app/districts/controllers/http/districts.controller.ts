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
import { DistrictsService } from 'src/app/districts/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateDistrictsDto, UpdateDistrictsDto } from 'src/app/districts/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';

@ApiSecurity('JWT')
@ApiTags('Districts')
@Controller({
  path: 'district',
  version: '1',
})
export class DistrictsHttpController {
  constructor(private readonly districtService: DistrictsService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createDistrictsDto: CreateDistrictsDto,
  ): Observable<ResponseEntity> {
    return this.districtService.create(createDistrictsDto).pipe(
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
  ): Observable<ResponseEntity> {
    return this.districtService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.districtService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.districtService.destroy(id).pipe(
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
    @Body() updateDistrictsDto: UpdateDistrictsDto,
  ): Observable<ResponseEntity> {
    return this.districtService.update(id, updateDistrictsDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
