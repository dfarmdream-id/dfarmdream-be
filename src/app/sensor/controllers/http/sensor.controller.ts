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
import { ChartFilterDTO } from '../../dtos/chart-filter.dto';

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
      const MQTT_URL = process.env.MQTT_URL ?? ''
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
          const msg = message.toString()
          let msgJson:any = null
          try{
            msgJson = msg ? JSON.parse(msg):null
          }catch(e){
            console.log("Message : ", msg)
            console.log("Failed to parse json data")
          }
          if(msgJson){
            const payload = new SensorLogDTO()
            payload.temperature = msgJson.temperature
            payload.ldrValue = msgJson.ldr_value
            payload.humidity = msgJson.humidity
            payload.amonia = msgJson.ammonia
            payload.airQuality = msgJson.air_quality
            this.sensorService.saveLogData(payload).catch((e)=>console.log("Failed to save log data : ",e.message))
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
    ): Observable<ResponseEntity> {
      return this.sensorService.paginate(paginateDto).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }

    @Get('/temperature')
    getTemperatureData(@Query() filter:ChartFilterDTO){
      return this.sensorService.getTemperatureChartDaily(filter);
    }

    @Get('/amonia')
    getAmoniaData(@Query() filter:ChartFilterDTO){
      return this.sensorService.getAmoniaChartDaily(filter);
    }

    @Get('/humidity')
    getHumidityData(@Query() filter:ChartFilterDTO){
      return this.sensorService.getHumidityDaily(filter);
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
      console.log("Delete Sensor");
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
  