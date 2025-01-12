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
import { JournalService } from '@app/journal/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateJournalDto, UpdateJournalDto } from '@app/journal/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { User } from '@src/app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('Journal')
@Controller({
  path: 'journal',
  version: '1',
})
export class JournalHttpController {
  constructor(private readonly journalHeaderService: JournalService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createJournalHeadersDto: CreateJournalDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.journalHeaderService
      .create(createJournalHeadersDto, user.id)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get('balance-sheets')
  async balanceSheets(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('cageId') cageId: string,
    @Query('batchId') batchId: string,
    @User() user: { id: string; siteId: string },
  ) {
    try {
      const data = await this.journalHeaderService.getTrialBalance(
        month,
        year,
        cageId,
        batchId,
        user.siteId,
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

  @UseGuards(AuthGuard)
  @Get('chart-keuangan')
  async chartKeuangan(
    @Query('year') year: string,
    @User() user: { id: string; siteId: string },
  ) {
    try {
      const data =
        await this.journalHeaderService.getChartBalanceSheetAndProfit(
          year,
          user.siteId,
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

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
    @Query('cageId') cageId: string,
    @Query('batchId') batchId: string,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.journalHeaderService
      .paginate(paginateDto, cageId, batchId, user.siteId)
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
    return this.journalHeaderService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.journalHeaderService.destroy(id).pipe(
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
    @Body() updateJournalHeadersDto: UpdateJournalDto,
  ): Observable<ResponseEntity> {
    return this.journalHeaderService.update(id, updateJournalHeadersDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
