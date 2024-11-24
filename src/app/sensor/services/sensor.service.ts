import { HttpStatus, Injectable } from '@nestjs/common';
import { SensorRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateSensorDTO, UpdateSensorDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { SensorLogDTO } from '../dtos/sensor-log.dto';
import { Prisma } from '@prisma/client';
import { ChartFilterDTO } from '../dtos/chart-filter.dto';

@Injectable()
export class SensorService {
  constructor(
    private readonly sensorRepository: SensorRepository,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.sensorRepository.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.sensorRepository.firstOrThrow({ id }));
  }

  update(id: string, updateSensorDTO: UpdateSensorDTO) {
    return from(this.sensorRepository.update({ id }, updateSensorDTO));
  }

  destroy(id: string) {
    return from(this.sensorRepository.delete({ id }));
  }

  create(createSensorDto: CreateSensorDTO) {
    return from(this.sensorRepository.create(createSensorDto));
  }

  async saveLogData(payload: SensorLogDTO) {
    try {
      const currentTime = new Date().getTime();
      const sensor = await this.prismaService.iotSensor.findFirst({
        orderBy: {
          id: 'asc',
        },
      });
      if (sensor) {
        await this.prismaService.sensorLog.create({
          data: {
            airQuality: payload.airQuality ?? 0,
            amonia: payload.amonia ?? 0,
            ldrValue: payload.ldrValue,
            humidity: payload.humidity,
            temperature: payload.temperature,
            epoch: currentTime,
            sensorId: sensor?.id ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        await this.prismaService.iotSensor.update({
          where: {
            id: sensor.id,
          },
          data: {
            currentAirQuality: payload.airQuality ?? 0,
            currentAmonia: payload.amonia ?? 0,
            currentTemperature: payload.temperature ?? 0,
            currentHumidty: payload.humidity ?? 0,
          },
        });
      }
      return true;
    } catch (e) {
      console.log('Failed to save log data');
      throw new Error(e);
    }
  }

  async getTemperatureChartDaily(filter: ChartFilterDTO) {
    let filterTanggal = filter.tanggal ? new Date(filter.tanggal) : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);

    // Query untuk mendapatkan rata-rata suhu per jam
    const data: any = await this.prismaService.$queryRaw`
      SELECT 
        DATE_TRUNC('hour', "createdAt") as hour,
        AVG(temperature) as average_temperature
      FROM "SensorLog"
      WHERE  "epoch" >= ${startOfDay}
      GROUP BY DATE_TRUNC('hour', "createdAt")
      ORDER BY hour ASC`;

    // Format data untuk ApexCharts
    const formattedData = data.map((item) => {
      const date = new Date(item.hour);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return {
        x: `${hours}:${minutes}`,
        y: Number(item.average_temperature.toFixed(2)),
      };
    });

    const sensors = await this.prismaService.iotSensor.findMany();
    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: formattedData,
        sensors: sensors,
      },
    };
  }

  async getAmoniaChartDaily(filter: ChartFilterDTO) {
    let filterTanggal = filter.tanggal ? new Date(filter.tanggal) : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);

    // Query untuk mendapatkan rata-rata suhu per jam
    const data: any = await this.prismaService.$queryRaw`
      SELECT 
        DATE_TRUNC('hour', "createdAt") as hour,
        AVG(amonia) as average_amonia
      FROM "SensorLog"
      WHERE  "epoch" >= ${startOfDay}
      GROUP BY DATE_TRUNC('hour', "createdAt")
      ORDER BY hour ASC`;

    // Format data untuk ApexCharts
    const formattedData = data.map((item) => {
      const date = new Date(item.hour);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return {
        x: `${hours}:${minutes}`,
        y: Number(item.average_amonia.toFixed(2)),
      };
    });
    const sensors = await this.prismaService.iotSensor.findMany();
    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: formattedData,
        sensors: sensors,
      },
    };
  }

  async getHumidityDaily(filter: ChartFilterDTO) {
    let filterTanggal = filter.tanggal ? new Date(filter.tanggal) : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);
    // Query untuk mendapatkan rata-rata suhu per jam
    const data: any = await this.prismaService.$queryRaw`
      SELECT 
        DATE_TRUNC('hour', "createdAt") as hour,
        AVG(humidity) as average_humidity
      FROM "SensorLog"
      WHERE  "epoch" >= ${startOfDay}
      GROUP BY DATE_TRUNC('hour', "createdAt")
      ORDER BY hour ASC`;

    // Format data untuk ApexCharts
    const formattedData = data.map((item) => {
      const date = new Date(item.hour);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return {
        x: `${hours}:${minutes}`,
        y: Number(item.average_humidity.toFixed(2)),
      };
    });
    const sensors = await this.prismaService.iotSensor.findMany();

    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: formattedData,
        sensors: sensors,
      },
    };
  }
}
