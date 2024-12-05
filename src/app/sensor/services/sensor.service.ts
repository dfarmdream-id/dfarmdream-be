import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SensorRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateSensorDTO, UpdateSensorDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { SensorLogDTO } from '../dtos/sensor-log.dto';
import { Prisma } from '@prisma/client';
import {
  ChartFilterDTO,
  PaginatedChartFilterDTO,
} from '../dtos/chart-filter.dto';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';

@Injectable()
export class SensorService {
  constructor(
    private readonly sensorRepository: SensorRepository,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: PaginationQueryDto, claim: JWTClaim) {
    return from(
      this.sensorRepository.paginate(paginateDto, {
        where: {
          cage: {
            siteId: claim.siteId,
          },
        },
      }),
    );
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
        // console.log(JSON.stringify(payload))
        await this.prismaService.sensorLog.create({
          data: {
            airQuality: payload.airQuality ? payload.airQuality : 0,
            amonia: payload.amonia ? payload.amonia : 0,
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
            lampStatus: payload.ldrValue ?? 0,
          },
        });

        if (
          payload.humidity >= sensor.humidityThreshold ||
          payload.temperature >= sensor.tempThreshold ||
          payload.amonia >= (sensor.amoniaThreshold ?? 30)
        ) {
          const lastStatus = await this.prismaService.relayLog.findFirst({
            where: { sensorId: sensor.id, relayNumber: 2 },
            orderBy: { createdAt: 'desc' },
          });

          if (!lastStatus || lastStatus.status === 0) {
            await this.prismaService.relayLog.create({
              data: {
                sensorId: sensor.id,
                relayNumber: 2,
                humidity: payload.humidity,
                temperature: payload.temperature,
                amonia: payload.amonia,
                status: 1,
                relayDesc: `Kipas Menyala Kondisi Sensor Amonia : ${payload.amonia ? payload.amonia : 0} PPM, Humidity: ${payload.humidity}, Temperature: ${payload.temperature}`,
              },
            });
          }
        } else {
          const lastStatus = await this.prismaService.relayLog.findFirst({
            where: { sensorId: sensor.id, relayNumber: 2 },
            orderBy: { createdAt: 'desc' },
          });
          if (!lastStatus || lastStatus.status === 1) {
            await this.prismaService.relayLog.create({
              data: {
                sensorId: sensor.id,
                relayNumber: 2,
                humidity: payload.humidity,
                temperature: payload.temperature,
                amonia: payload.amonia,
                status: 0,
                relayDesc: `Kipas Mati Kondisi Sensor Amonia : ${payload.amonia ? payload.amonia : 0} PPM, Humidity: ${payload.humidity}, Temperature: ${payload.temperature}`,
              },
            });
          }
        }

        // Save status lampu mati
        if (payload.ldrValue > 0) {
          const lastStatus = await this.prismaService.relayLog.findFirst({
            where: { sensorId: sensor.id, relayNumber: 1 },
            orderBy: { createdAt: 'desc' },
          });
          if (!lastStatus || lastStatus.status === 0) {
            await this.prismaService.relayLog.create({
              data: {
                sensorId: sensor.id,
                relayNumber: 1,
                humidity: payload.humidity,
                temperature: payload.temperature,
                amonia: payload.amonia,
                status: 1,
                relayDesc: `Lampu Menyala`,
              },
            });
          }
        } else {
          const lastStatus = await this.prismaService.relayLog.findFirst({
            where: { sensorId: sensor.id, relayNumber: 1 },
            orderBy: { createdAt: 'desc' },
          });
          if (!lastStatus || lastStatus.status === 1) {
            await this.prismaService.relayLog.create({
              data: {
                sensorId: sensor.id,
                relayNumber: 1,
                humidity: payload.humidity,
                temperature: payload.temperature,
                amonia: payload.amonia,
                status: 0,
                relayDesc: `Lampu Mati`,
              },
            });
          }
        }
      }

      return true;
    } catch (e) {
      console.log('Failed to save log data : ', e.message);
      // throw new Error(e);
    }
  }

  async getTemperatureChartDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const filterTanggal = filter.tanggal
      ? new Date(filter.tanggal)
      : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);
    let cageIds: any = [];
    let where = {};

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
      where = {
        ...where,
        cageId: {
          in: cageIds,
        },
      };
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
      where = {
        ...where,
        cageId: filter.cageId,
      };
    }

    const data: any = await this.prismaService.$queryRaw`
    SELECT 
      DATE_TRUNC('hour', "SensorLog"."createdAt") as hour,
      AVG(temperature) as average_temperature
    FROM "SensorLog" 
    LEFT JOIN "IotSensor" on "IotSensor"."id" = "SensorLog"."sensorId"
    WHERE "epoch" >= ${startOfDay}
    ${cageIds.length > 0 ? Prisma.sql`AND "IotSensor"."cageId" IN (${Prisma.join(cageIds)})` : Prisma.empty}
    GROUP BY DATE_TRUNC('hour', "SensorLog"."createdAt")
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

    const sensors = await this.prismaService.iotSensor.findMany({
      where,
    });
    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: sensors && sensors.length > 0 ? formattedData : [],
        sensors: sensors,
      },
    };
  }


  async getAmoniaChartDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const filterTanggal = filter.tanggal
      ? new Date(filter.tanggal)
      : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);
    let cageIds: any = [];
    let where = {};

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
      where = {
        ...where,
        cageId: {
          in: cageIds,
        },
      };
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
      where = {
        ...where,
        cageId: filter.cageId,
      };
    }

    const data: any = await this.prismaService.$queryRaw`
    SELECT 
      DATE_TRUNC('hour', "SensorLog"."createdAt") as hour,
      AVG(temperature) as average_amonia
    FROM "SensorLog" 
    LEFT JOIN "IotSensor" on "IotSensor"."id" = "SensorLog"."sensorId"
    WHERE "epoch" >= ${startOfDay}
    ${cageIds.length > 0 ? Prisma.sql`AND "IotSensor"."cageId" IN (${Prisma.join(cageIds)})` : Prisma.empty}
    GROUP BY DATE_TRUNC('hour', "SensorLog"."createdAt")
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
    const sensors = await this.prismaService.iotSensor.findMany({ where });
    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: sensors && sensors.length > 0 ? formattedData : [],
        sensors: sensors,
      },
    };
  }

  async getHumidityDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const filterTanggal = filter.tanggal
      ? new Date(filter.tanggal)
      : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);

    let cageIds: any = [];
    let where = {};

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
      where = {
        ...where,
        cageId: {
          in: cageIds,
        },
      };
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
      where = {
        ...where,
        cageId: filter.cageId,
      };
    }

    const data: any = await this.prismaService.$queryRaw`
    SELECT 
      DATE_TRUNC('hour', "SensorLog"."createdAt") as hour,
      AVG(temperature) as average_humidity
    FROM "SensorLog" 
    LEFT JOIN "IotSensor" on "IotSensor"."id" = "SensorLog"."sensorId"
    WHERE "epoch" >= ${startOfDay}
    ${cageIds.length > 0 ? Prisma.sql`AND "IotSensor"."cageId" IN (${Prisma.join(cageIds)})` : Prisma.empty}
    GROUP BY DATE_TRUNC('hour', "SensorLog"."createdAt")
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
    const sensors = await this.prismaService.iotSensor.findMany({ where });

    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        chart: sensors && sensors.length > 0 ? formattedData : [],
        sensors: sensors,
      },
    };
  }

  async getRelayLog(filter: PaginatedChartFilterDTO, user: JWTClaim) {
    // let filterTanggal = filter.tanggal ? new Date(filter.tanggal) : new Date();
    // const startOfDay = filterTanggal.setHours(0, 0, 0, 0);
    let cageIds: any = [];
    let where = {};

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
      where = {
        ...where,
        sensor: {
          cageId: {
            in: cageIds,
          },
        },
      };
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
      where = {
        ...where,
        sensor: {
          cageId: filter.cageId,
        },
      };
    }

    try {
      const skip: number = ((filter.page ?? 1) - 1) * (filter.limit ?? 10);
      const take: number = filter.limit ?? 10;

      const models = await this.prismaService.relayLog.findMany({
        where,
        include: {
          sensor: {
            include: {
              cage: {
                include: {
                  site: true,
                },
              },
            },
          },
        },
        skip: Number(skip),
        take: Number(take),
      });

      const totalRecords = await this.prismaService.relayLog.count({
        where: where,
      });

      const totalPages = Math.ceil(totalRecords / (filter.limit ?? 10));
      return {
        status: HttpStatus.OK,
        message: 'Success get relay log data',
        data: {
          data: models,
          meta: {
            totalRecords: totalRecords,
            currentPage: filter.page,
            totalPages: totalPages,
            pageSize: filter.limit,
          },
        },
      };
    } catch (e) {
      throw new HttpException(
        'Failed to get relay status',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
