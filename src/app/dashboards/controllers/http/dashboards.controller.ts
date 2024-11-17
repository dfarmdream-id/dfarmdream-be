import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardsService } from 'src/app/dashboards/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';

@ApiSecurity('JWT')
@ApiTags('Dashboards')
@Controller({
  path: 'dashboard',
  version: '1',
})
export class DashboardsHttpController {
  constructor(private readonly dashboardService: DashboardsService) {}

  @Get()
  public index(): Observable<ResponseEntity> {
    return this.dashboardService.summary().pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get('chart')
  public chart() {
    return this.dashboardService.chart().pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }
}
