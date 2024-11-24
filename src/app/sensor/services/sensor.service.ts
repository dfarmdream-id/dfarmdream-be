import { Injectable } from '@nestjs/common';
import { SensorRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateSensorDTO, UpdateSensorDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { SensorLogDTO } from '../dtos/sensor-log.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SensorService {
  constructor(private readonly sensorRepository: SensorRepository, private readonly prismaService:PrismaService) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.sensorRepository.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.sensorRepository.firstOrThrow({ id }));
  }

  update(id: string, updateSensorDTO: UpdateSensorDTO) {
    return from(this.sensorRepository.update({id}, updateSensorDTO))
  }

  destroy(id: string) {
    return from(this.sensorRepository.delete({ id }));
  }

  create(createSensorDto: CreateSensorDTO) {
    return from(this.sensorRepository.create(createSensorDto));
  }

  async saveLogData(payload:SensorLogDTO){
    try{
      const currentTime = new Date().getTime();
      const sensor = await this.prismaService.iotSensor.findFirst({
        orderBy:{
          id:'asc'
        }
      })
      if(sensor){
        await this.prismaService.sensorLog.create({
          data:{
            airQuality: payload.airQuality ?? 0,
            amonia: payload.amonia??0,
            ldrValue:payload.ldrValue,
            humidity: payload.humidity,
            temperature: payload.temperature,
            epoch: currentTime,
            sensorId:sensor?.id ?? '',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
        await this.prismaService.iotSensor.update({
          where: {
            id: sensor.id,
          },
          data: {
            currentAirQuality: payload.airQuality ?? 0,
            currentAmonia: payload.amonia ?? 0,
            currentTemperature:payload.temperature ?? 0,
            currentHumidty:payload.humidity ?? 0,
          },
        })
      }
      return true
    }catch(e){
      console.log("Failed to save log data")
      throw new Error(e)
    }
  }
}
