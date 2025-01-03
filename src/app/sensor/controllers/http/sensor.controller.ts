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
import { SensorService } from '../../services';
import { CreateSensorDTO, UpdateSensorDTO } from '../../dtos';
import {
  ChartFilterDTO,
  PaginatedChartFilterDTO,
} from '../../dtos/chart-filter.dto';
import { User } from '@src/app/auth/decorators';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';
import { MqttClient } from 'mqtt';
import { PaginateSensorLog } from '../../dtos/sensor-log.dto';

@ApiSecurity('JWT')
@ApiTags('IOT Sensors')
@Controller({
  path: 'sensor',
  version: '1',
})
export class SensorHttpController {
  public readonly mqtt: MqttClient;
  public readonly topic: string;
  public readonly sensorId: string;

  constructor(private readonly sensorService: SensorService) {}

  @Get('/sync-ten-minutes')
  public syncTenMinutesData() {
    return this.sensorService.syncTenMinutesData();
  }

  @Get('/sync-ten-minutes-30')
  public syncTenMinutes30Data() {
    return this.sensorService.sync30DaysData();
  }
  
  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createSensorDTO: CreateSensorDTO,
  ): Observable<ResponseEntity> {
    return this.sensorService.create(createSensorDTO).pipe(
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
    return this.sensorService.paginate(paginateDto, user).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/log')
  public async getLogData(
    @Query() paginateDto: PaginateSensorLog,
  ) {
    try{
      const data = await this.sensorService.paginateLog(paginateDto)
      return new ResponseEntity({ data, message: 'success' });
    }catch(e){
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/temperature')
  getTemperatureData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getTemperatureChartDaily(filter, user);
  }

  @UseGuards(AuthGuard)
  @Get('/amonia')
  getAmoniaData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getAmoniaChartDaily(filter, user);
  }

  @UseGuards(AuthGuard)
  @Get('/humidity')
  getHumidityData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getHumidityDaily(filter, user);
  }

  @UseGuards(AuthGuard)
  @Get('/ldr')
  getLdrData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getLdrData(filter, user);
  }

  @UseGuards(AuthGuard)
  @Get('/relay-log')
  getRelayLog(
    @Query() filter: PaginatedChartFilterDTO,
    @User() user: JWTClaim,
  ) {
    return this.sensorService.getRelayLog(filter, user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.sensorService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    console.log('Delete Sensor');
    return this.sensorService.destroy(id).pipe(
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
    @Body() updateSensorDTO: UpdateSensorDTO,
  ): Observable<ResponseEntity> {
    return this.sensorService.update(id, updateSensorDTO).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
