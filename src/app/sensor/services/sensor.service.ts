import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SensorRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateSensorDTO, UpdateSensorDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { SensorLogDTO } from '../dtos/sensor-log.dto';
import { Prisma, SensorType } from '@prisma/client';
import {
  ChartFilterDTO,
  PaginatedChartFilterDTO,
} from '../dtos/chart-filter.dto';
import { MqttClient, connect } from 'mqtt';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';

@Injectable()
export class SensorService {
  public readonly mqtt: MqttClient;
  public readonly topic: string;
  public readonly sensorId: string;
  constructor(
    private readonly sensorRepository: SensorRepository,
    private readonly prismaService: PrismaService,
  ) {
    const topics = process.env.MQTT_TOPICS;
    this.sensorId = process.env.MQTT_SENSOR_ID || '8KVP701731';
    const listTopic = topics ? topics.split(',') : [];
    const MQTT_URL = process.env.MQTT_URL ?? '';
     this.mqtt = connect(MQTT_URL, {
      clientId: '',
      clean: true,
      connectTimeout: 10,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 10,
    });

    this.topic = process.env.MQTT_TOPIC || 'd-farm/sensor';
    console.log(
      `Connecting to MQTT server with IP: ${MQTT_URL} and topic: ${this.topic}`,
    );

    this.mqtt.on('connect', () => {
      console.log('Connected to MQTT server');
    });

    for (const topic of listTopic) {
      const theTopic = 'd-farm/' + topic + '_' + this.sensorId;
      console.log(`Subscribing to topic: ${theTopic}`);
      this.mqtt.subscribe(theTopic);
    }

    // this.mqtt.subscribe(this.topic);

    this.mqtt.on('message', (topic, message) => {
      this.saveLogBasedOnTopic(message.toString(), topic);
    });
  }

  async mappingTopicToSensorType(msgJson: any, topic: string) {
    let sensorType = '';
    const topicSplit = topic.split('/');
    if (topicSplit.length > 2) {
      sensorType = topicSplit[1].replace(`_${this.sensorId}`, '').toUpperCase();
    }
    const iot = await this.prismaService.iotSensor.findFirst({
      where: {
        code: this.sensorId,
      },
    });
    if(iot){
      const payload = new SensorLogDTO();
      if (sensorType === 'LDR') {
        if (msgJson.ldr && msgJson.ldr > 500) {
          this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_ON');
        } else {
          this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_OFF');
        }
  
        await this.prismaService.iotSensor.update({
          where: {
            id: iot?.id,
          },
          data: {
            lampStatus: msgJson.ldr ?? 0,
          },
        });
  
        payload.sensorType = SensorType.LDR;
        payload.value = msgJson.ldr;
        this.saveLogData(payload, SensorType.LDR).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
      } else if (sensorType === 'AMONIA') {
        let amonia: number = parseFloat(msgJson.amonia);
        if (amonia && amonia > 100) {
          amonia = 0;
        }
        await this.prismaService.iotSensor.update({
          where: {
            id: iot?.id,
          },
          data: {
            currentAmonia: amonia,
          },
        });
        // {"device_id":"8KVP701731","air_quality":43,"nilaiRO":null,"amonia":"0.55"}
        payload.sensorType = SensorType.GAS;
        payload.value = amonia;
        this.saveLogData(payload, SensorType.GAS).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
      } else if (sensorType === 'SUHU') {
        if (iot.tempThreshold && msgJson.temperature > iot.tempThreshold) {
          this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY2_ON');
        } else {
          this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY2_OFF');
        }
        await this.prismaService.iotSensor.update({
          where: {
            id: iot?.id,
          },
          data: {
            currentTemperature: msgJson.temperature ?? 0,
          },
        });
        payload.sensorType = SensorType.TEMP;
        payload.value = msgJson.temperature;
        this.saveLogData(payload, SensorType.TEMP).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
  
        await this.prismaService.iotSensor.update({
          where: {
            id: iot?.id,
          },
          data: {
            currentTemperature: msgJson.humidity ?? 0,
          },
        });
        payload.sensorType = SensorType.HUMIDITY;
        payload.value = msgJson.humidity;
        this.saveLogData(payload, SensorType.HUMIDITY).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
      }
    }

   
  }

  saveLogBasedOnTopic(message: string, topic: string) {
    const msg = message.toString();
    let msgJson: any = null;
    try {
      msgJson = msg ? JSON.parse(msg) : null;
    } catch (e) {
      console.log('Message : ', msg);
      console.log('Failed to parse json data');
    }
    if (msgJson) {
      this.mappingTopicToSensorType(msgJson, topic);
    }
  }

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

  async saveLogData(payload: SensorLogDTO, type: SensorType) {
    try {
      const currentTime = new Date().getTime();
      const iot = await this.prismaService.iotSensor.findFirst({
        where: { code: this.sensorId },
        orderBy: {
          id: 'asc',
        },
      });
      const sensor = await this.prismaService.sensorDevice.findFirst({
        where: { code: this.sensorId, type },
        orderBy: {
          id: 'asc',
        },
      });
      if (sensor) {
        // console.log(JSON.stringify(payload))
        await this.prismaService.sensorLog.create({
          data: {
            type: payload.sensorType,
            value: payload.value,
            epoch: currentTime,
            sensorId: sensor?.id ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        if (type === SensorType.TEMP && iot) {
          if (payload.value >= iot.tempThreshold) {
            const lastStatus = await this.prismaService.relayLog.findFirst({
              where: { sensorId: sensor.id, relayNumber: 2 },
              orderBy: { createdAt: 'desc' },
            });

            if (!lastStatus || lastStatus.status === 0) {
              await this.prismaService.relayLog.create({
                data: {
                  sensorId: iot.id,
                  relayNumber: 2,
                  humidity: iot.currentHumidty,
                  temperature: payload.value,
                  amonia: iot.currentAmonia,
                  status: 1,
                  relayDesc: `Kipas Menyala Kondisi Sensor Amonia : ${iot.currentAmonia ?? 0} PPM, Humidity: ${iot.currentHumidty}, Temperature: ${payload.value}`,
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
                  humidity: iot.currentHumidty,
                  temperature: payload.value,
                  amonia: iot.currentAmonia,
                  status: 0,
                  relayDesc: `Kipas Mati Kondisi Sensor Amonia : ${iot.currentAmonia ?? 0} PPM, Humidity: ${iot.currentHumidty}, Temperature: ${payload.value}`,
                },
              });
              if (!lastStatus || lastStatus.status === 1) {
                await this.prismaService.relayLog.create({
                  data: {
                    sensorId: sensor.id,
                    relayNumber: 2,
                    humidity: iot.currentHumidty,
                    temperature: payload.value,
                    amonia: iot.currentAmonia,
                    status: 0,
                    relayDesc: `Kipas Mati Kondisi Sensor Amonia : ${iot.currentAmonia ?? 0} PPM, Humidity: ${iot.currentHumidty}, Temperature: ${iot.currentTemperature}`,
                  },
                });
              }
            }
          }
        }

        if (type === SensorType.LDR) {
          // Save status lampu mati
          if (payload.value > 0) {
            const lastStatus = await this.prismaService.relayLog.findFirst({
              where: { sensorId: sensor.id, relayNumber: 1 },
              orderBy: { createdAt: 'desc' },
            });
            if (!lastStatus || lastStatus.status === 0) {
              await this.prismaService.relayLog.create({
                data: {
                  sensorId: iot?.id,
                  relayNumber: 1,
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
                  sensorId: iot?.id,
                  relayNumber: 1,
                  status: 0,
                  relayDesc: `Lampu Mati`,
                },
              });
            }
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
