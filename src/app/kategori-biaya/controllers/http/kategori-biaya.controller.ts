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
  import { CreateKategoriBiaya, UpdateKategoriBiayaDTO } from '../../dtos';
import { KategoriBiayaService } from '../../services';
  
  @ApiSecurity('JWT')
  @ApiTags('Kategori Biaya')
  @Controller({
    path: 'kategori-biaya',
    version: '1',
  })
  export class KategoriBiayaController {
    constructor(private readonly kategoriBiayaService: KategoriBiayaService) {}
  
    @UseGuards(AuthGuard)
    @Post()
    public create(
      @Body() payload: CreateKategoriBiaya,
    ): Observable<ResponseEntity> {
      return this.kategoriBiayaService.create(payload).pipe(
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
      return this.kategoriBiayaService.paginate(paginateDto).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }
  
    @UseGuards(AuthGuard)
    @Get(':id')
    public detail(@Param('id') id: string): Observable<ResponseEntity> {
      return this.kategoriBiayaService.detail(id).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }

   
    @UseGuards(AuthGuard)
    @Delete(':id')
    public destroy(@Param('id') id: string): Observable<ResponseEntity> {
      return this.kategoriBiayaService.destroy(id).pipe(
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
      @Body() payload: UpdateKategoriBiayaDTO,
    ): Observable<ResponseEntity> {
      return this.kategoriBiayaService.update(id, payload).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
    }
  }
  