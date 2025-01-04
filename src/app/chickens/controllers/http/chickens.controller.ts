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
import { ChickensService } from 'src/app/chickens/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateChickensDto, UpdateChickensDto } from 'src/app/chickens/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@src/app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('Chickens')
@Controller({
  path: 'chicken',
  version: '1',
})
export class ChickensHttpController {
  constructor(private readonly chickenService: ChickensService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createChickensDto: CreateChickensDto,
  ): Observable<ResponseEntity> {
    console.log(createChickensDto);
    return this.chickenService.create(createChickensDto).pipe(
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
    @Query('rackId') rackId: string | null,
    @Query('batchId') batchId: string | null,
    @Query('cageId') cageId: string | null,
    @Query('dateRangeFilter') dateRange: string | null,
    @Query('status') status: string | null,
    @Query('diseaseId') diseaseId: string | null,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.chickenService
      .paginate(
        paginateDto,
        user.siteId,
        rackId,
        batchId,
        cageId,
        dateRange,
        status,
        diseaseId,
      )
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.chickenService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.chickenService.destroy(id).pipe(
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
    @Body() updateChickensDto: UpdateChickensDto,
  ): Observable<ResponseEntity> {
    return this.chickenService.update(id, updateChickensDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
