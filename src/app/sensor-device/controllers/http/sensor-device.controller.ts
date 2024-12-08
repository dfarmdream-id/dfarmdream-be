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
import { User } from '@src/app/auth/decorators';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';
import { connect, MqttClient } from 'mqtt';
import { SensorDeviceService } from '../../services';
import { CreateSensorDevice, UpdateSensorDevice } from '../../dtos';

@ApiSecurity('JWT')
@ApiTags('IOT Sensor Device')
@Controller({
  path: 'sensor-device',
  version: '1',
})
export class SensorDeviceHttpController {
  public readonly mqtt: MqttClient;
  public readonly topic: string;
  public readonly sensorId: string;
  
  constructor(private readonly sensorDeviceService:SensorDeviceService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() body: CreateSensorDevice,
  ): Observable<ResponseEntity> {
    return this.sensorDeviceService.create(body).pipe(
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
    return this.sensorDeviceService.paginate(paginateDto, user).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.sensorDeviceService.detail(id).pipe(
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
    return this.sensorDeviceService.destroy(id).pipe(
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
    @Body() payload: UpdateSensorDevice,
  ): Observable<ResponseEntity> {
    return this.sensorDeviceService.update(id, payload).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
