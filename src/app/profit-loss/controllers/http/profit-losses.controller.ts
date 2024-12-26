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
import { ProfitLossesService } from 'src/app/profit-loss/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';

@ApiTags('ProfitLosses')
@Controller({
  path: 'profit-loss',
  version: '1',
})
export class ProfitLossesHttpController {
  constructor(private readonly profitService: ProfitLossesService) {}

  @Get('profit-loss')
  async profitLosses(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('cageId') cageId: string,
    @Query('batchId') batchId: string,
  ) {
    try {
      const data = await this.profitService.getProfitLoss(
        month,
        year,
        cageId,
        batchId,
      );
      return {
        data,
        message: 'Balance sheet data retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve balance sheet data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post()
  // public create(
  //   @Body() createCoasDto: CreateCoasDto,
  // ): Observable<ResponseEntity> {
  //   return this.coaService.create(createCoasDto).pipe(
  //     map((data) => new ResponseEntity({ data, message: 'success' })),
  //     catchError((error) => {
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }),
  //   );
  // }

  // @Get()
  // public index(
  //   @Query() paginateDto: PaginationQueryDto,
  // ): Observable<ResponseEntity> {
  //   return this.coaService.paginate(paginateDto).pipe(
  //     map((data) => new ResponseEntity({ data, message: 'success' })),
  //     catchError((error) => {
  //       throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //     }),
  //   );
  // }

  // @Get(':id')
  // public detail(@Param('id') id: string): Observable<ResponseEntity> {
  //   return this.coaService.detail(id).pipe(
  //     map((data) => new ResponseEntity({ data, message: 'success' })),
  //     catchError((error) => {
  //       throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //     }),
  //   );
  // }

  // @Delete(':id')
  // public destroy(@Param('id') id: string): Observable<ResponseEntity> {
  //   return this.coaService.destroy(id).pipe(
  //     map((data) => new ResponseEntity({ data, message: 'success' })),
  //     catchError((error) => {
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }),
  //   );
  // }

  // @Put(':id')
  // public update(
  //   @Param('id') id: string,
  //   @Body() updateCoasDto: UpdateCoasDto,
  // ): Observable<ResponseEntity> {
  //   return this.coaService.update(id, updateCoasDto).pipe(
  //     map((data) => new ResponseEntity({ data, message: 'success' })),
  //     catchError((error) => {
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }),
  //   );
  // }
}
