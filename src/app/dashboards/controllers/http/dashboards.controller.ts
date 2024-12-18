import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DashboardsService } from 'src/app/dashboards/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '@src/app/auth/decorators';
import { AuthGuard } from '@src/app/auth';
import { ChartEggDto } from '@app/dashboards/dtos/chart-egg.dto';

@ApiSecurity('JWT')
@ApiTags('Dashboards')
@Controller({
  path: 'dashboard',
  version: '1',
})
export class DashboardsHttpController {
  constructor(private readonly dashboardService: DashboardsService) {}

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @User() user: { id: string; siteId: string },
    // get param date, cageId
    @Query() query: { date: string; cageId: string },
  ): Observable<ResponseEntity> {
    return this.dashboardService
      .summary(user.siteId, {
        date: query.date,
        cageId: query.cageId,
      })
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get('chart')
  public chart(
    @User() user: { id: string; siteId: string },
    @Query() query: { date: string; cageId: string },
  ) {
    return this.dashboardService
      .chart(user.siteId, {
        date: query.date,
        cageId: query.cageId,
      })
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get('chart-egg')
  public chartEgg(
    @User() user: { id: string; siteId: string },
    @Query() queryDto: ChartEggDto,
  ) {
    return this.dashboardService.chartEgg(user.siteId, queryDto.groupBy).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('chart-chicken')
  public chartChicken(
    @User() user: { id: string; siteId: string },
    @Query() queryDto: ChartEggDto,
  ) {
    return this.dashboardService
      .chartChicken(user.siteId, queryDto.groupBy)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get('chart-disease')
  public chartDisease(
    @User() user: { id: string; siteId: string },
    @Query() query: { date: string; cageId: string },
  ) {
    return this.dashboardService.chartDisease(user.siteId, {
      date: query.date,
      cageId: query.cageId,
    }).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }
}
