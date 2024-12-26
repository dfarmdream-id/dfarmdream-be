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
  Query, UseGuards,
} from '@nestjs/common';
import { BatchesService } from 'src/app/batches/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateBatchesDto, UpdateBatchesDto } from 'src/app/batches/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';
import { User } from '@app/auth/decorators';
import {AuthGuard} from "@app/auth";

@ApiTags('Batches')
@Controller({
  path: 'batch',
  version: '1',
})
export class BatchesHttpController {
  constructor(private readonly batchService: BatchesService) {}

  @Post()
  public create(
    @Body() createBatchesDto: CreateBatchesDto,
  ): Observable<ResponseEntity> {
    return this.batchService.create(createBatchesDto).pipe(
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
    @User() user: JWTClaim,
  ): Observable<ResponseEntity> {
    return this.batchService.paginate(paginateDto, user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.batchService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.batchService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateBatchesDto: UpdateBatchesDto,
  ): Observable<ResponseEntity> {
    return this.batchService.update(id, updateBatchesDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
