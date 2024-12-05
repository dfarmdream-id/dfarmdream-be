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
import { MqttClient, connect } from 'mqtt';
import { SensorLogDTO } from '../../dtos/sensor-log.dto';
import {
  ChartFilterDTO,
  PaginatedChartFilterDTO,
} from '../../dtos/chart-filter.dto';
import { User } from '@src/app/auth/decorators';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';

@ApiSecurity('JWT')
@ApiTags('IOT Sensors')
@Controller({
  path: 'sensor',
  version: '1',
})
export class SensorHttpController {
  public readonly mqtt: MqttClient;
  public readonly topic: string;

  constructor(private readonly sensorService: SensorService) {
    // Koneksi ke MQTT
    const MQTT_URL = process.env.MQTT_URL ?? '';
    this.mqtt = connect(MQTT_URL, {
      clientId: process.env.clientId || '',
      clean: true,
      connectTimeout: 10,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 10,
    });

    this.topic = process.env.MQTT_TOPIC || 'd-farm/sensor';

    this.mqtt.on('connect', () => {
      console.log('Connected to MQTT server');
    });

    this.mqtt.subscribe(this.topic);

    this.mqtt.on('message', (topic, message) => {
      if (topic == this.topic) {
        // console.log("JSON : ", message.toString())
        const msg = message.toString();
        let msgJson: any = null;
        try {
          msgJson = msg ? JSON.parse(msg) : null;
        } catch (e) {
          console.log('Message : ', msg);
          console.log('Failed to parse json data');
        }
        if (msgJson) {
          let amonia: number = parseFloat(msgJson.ammonia);
          if (amonia && amonia > 100) {
            // console.log("here ",amonia)
            amonia = 0;
          }
          // console.log(msgJson.ammonia)
          const payload = new SensorLogDTO();
          payload.temperature = msgJson.temperature;
          payload.ldrValue = msgJson.ldr_value;
          payload.humidity = msgJson.humidity;
          payload.amonia = amonia;
          payload.airQuality = msgJson.air_quality;
          this.sensorService
            .saveLogData(payload)
            .catch((e) => console.log('Failed to save log data : ', e.message));
        }
        // this.sensorService.saveLogData(message.toString())
        // this.processReceivedMessage(topic, message.toString());
      }
    });
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
  @Get('/temperature')
  getTemperatureData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getTemperatureChartDaily(filter, user);
  }

  @Get('/amonia')
  getAmoniaData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getAmoniaChartDaily(filter, user);
  }

  @Get('/humidity')
  getHumidityData(@Query() filter: ChartFilterDTO, @User() user: JWTClaim) {
    return this.sensorService.getHumidityDaily(filter, user);
  }

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
