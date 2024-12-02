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
  import { ResponseEntity } from 'src/common/entities/response.entity';
  import { ApiSecurity, ApiTags } from '@nestjs/swagger';
  import { catchError, map } from 'rxjs';
  import { Observable } from 'rxjs';
  import { AuthGuard } from '@src/app/auth';
  import { PersediaanBarangService } from '../../services';
  import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../../dtos';
  import { FilterPersediaanBarangDTO } from '../../dtos/filter-persediaan-barang.dto';
import { User } from '@src/app/auth/decorators';
import { TransaksiBarangDTO } from '../../dtos/transaksi.dto';
import { FilterTransaksiBarangDTO } from '../../dtos/filter-transaksi-barang.dto';
  
  @ApiSecurity('JWT')
  @ApiTags('Persediaan Barang')
  @Controller({
    path: 'persediaan-barang',
    version: '1',
  })
  export class PersediaanBarangController {
    constructor(private readonly persediaanBarangService: PersediaanBarangService) {}
    
    @UseGuards(AuthGuard)
    @Get('/transaksi')
    public indexTransaksi(
      @Query() paginateDto: FilterTransaksiBarangDTO,
    ): Observable<ResponseEntity> {
      return this.persediaanBarangService.paginateTransaksi(paginateDto).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }
    
    @UseGuards(AuthGuard)
    @Post()
    public create(
      @Body() payload: CreatePersediaanBarang,
      @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string }
    ) {
      return this.persediaanBarangService.create(payload, user);
    }
  
    @UseGuards(AuthGuard)
    @Get()
    public index(
      @Query() paginateDto: FilterPersediaanBarangDTO,
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
      @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string }
    ) {
      return this.persediaanBarangService.update(id, payload, user)
    }


    @Post('/transaksi')
    @UseGuards(AuthGuard)
    public transaksiBarang(@Body() body:TransaksiBarangDTO, @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string }){
      return this.persediaanBarangService.submitTransaksi(body, user)
    }

  }
  