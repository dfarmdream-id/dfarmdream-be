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
import { BiayaService } from '../../services';
import { CreateBiayaDTO, UpdateBiayaDTO } from '../../dtos';
import { User } from '@src/app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('Biaya')
@Controller({
  path: 'biaya',
  version: '1',
})
export class BiayaController {
  constructor(private readonly biayaService: BiayaService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @User() user: { id: string; siteId: string },
    @Body() payload: CreateBiayaDTO,
  ) {
    payload.userId = user.id;
    // return this.biayaService.create(payload).pipe(
    //   map((data) => new ResponseEntity({ data, message: 'success' })),
    //   catchError((error) => {
    //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //   }),
    // );
    return this.biayaService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
    @User() user: { siteId: string },
  ): Observable<ResponseEntity> {
    return this.biayaService.paginate(paginateDto, user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.biayaService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.biayaService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public update(
    @User() user: { id: string; siteId: string },
    @Param('id') id: string,
    @Body() payload: UpdateBiayaDTO,
  ): Observable<ResponseEntity> {
    payload.userId = user.id;
    return this.biayaService.update(id, payload).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
