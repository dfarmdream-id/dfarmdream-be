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
  import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
  import { ResponseEntity } from 'src/common/entities/response.entity';
  import { ApiSecurity, ApiTags } from '@nestjs/swagger';
  import { catchError, map } from 'rxjs';
  import { Observable } from 'rxjs';
  import { AuthGuard } from '@src/app/auth';
import { PersediaanBarangService } from '../../services';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../../dtos';
  
  @ApiSecurity('JWT')
  @ApiTags('Persediaan Barang')
  @Controller({
    path: 'persediaan-biaya',
    version: '1',
  })
  export class PersediaanBarangController {
    constructor(private readonly persediaanBarangService: PersediaanBarangService) {}
  
    @UseGuards(AuthGuard)
    @Post()
    public create(
      @Body() payload: CreatePersediaanBarang,
    ): Observable<ResponseEntity> {
      return this.persediaanBarangService.create(payload).pipe(
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
      return this.persediaanBarangService.paginate(paginateDto).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }
  
    @UseGuards(AuthGuard)
    @Get(':id')
    public detail(@Param('id') id: string): Observable<ResponseEntity> {
      return this.persediaanBarangService.detail(id).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }

   
    @UseGuards(AuthGuard)
    @Delete(':id')
    public destroy(@Param('id') id: string): Observable<ResponseEntity> {
      return this.persediaanBarangService.destroy(id).pipe(
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
      @Body() payload: UpdatePersediaanBarangDTO,
    ): Observable<ResponseEntity> {
      return this.persediaanBarangService.update(id, payload).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
    }
  }
  