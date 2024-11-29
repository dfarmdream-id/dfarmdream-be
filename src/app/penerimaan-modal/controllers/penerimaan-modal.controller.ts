import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PenerimaanModalService } from '../services/penerimaan-modal.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePenerimaanModal } from '../dtos/create-penerimaan-modal.dto';
import { catchError, map, Observable } from 'rxjs';
import { ResponseEntity } from '@src/common/entities/response.entity';
import { AuthGuard } from '@src/app/auth';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { UpdatePenerimaanModalDTO } from '../dtos/update-penerimaan-modal.dto';

@ApiSecurity('JWT')
@ApiTags('Penerimaan Modal')
@Controller({
  path: 'penerimaan-modal',
  version: '1',
})
export class PenerimaanModalController {
  constructor(private readonly penerimaanModalService: PenerimaanModalService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() payload: CreatePenerimaanModal,
  ): Observable<ResponseEntity> {
    return this.penerimaanModalService.create(payload).pipe(
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
    return this.penerimaanModalService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.penerimaanModalService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

 
  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.penerimaanModalService.destroy(id).pipe(
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
    @Body() payload: UpdatePenerimaanModalDTO,
  ): Observable<ResponseEntity> {
    return this.penerimaanModalService.update(id, payload).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
