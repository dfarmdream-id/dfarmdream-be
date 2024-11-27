import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DashboardsService } from 'src/app/dashboards/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '@src/app/auth/decorators';
import { AuthGuard } from '@src/app/auth';

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
  ): Observable<ResponseEntity> {
    return this.dashboardService.summary(user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('chart')
  public chart(@User() user: { id: string; siteId: string }) {
    return this.dashboardService.chart(user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }
}
