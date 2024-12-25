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
import moment from 'moment';

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

    this.mqtt.on('message', async (topic, message) => {
      // console.log(`TOPIC (${topic}) : `,JSON.stringify(message.toString()))
      await this.saveLogBasedOnTopic(message.toString(), topic);
    });
  }

  async mappingTopicToSensorType(msgJson: any, topic: string) {
    let sensorType = '';
    let sensorCode = '';
    const topicSplit = topic.split('/');
    if (topicSplit.length > 1) {
      sensorType = topicSplit[1].replace(`_${this.sensorId}`, '').toUpperCase();
      sensorCode = topicSplit[1];
    }
    const iot = await this.prismaService.iotSensor.findFirst({
      where: {
        code: this.sensorId,
      },
    });
    if (iot) {
      const payload = new SensorLogDTO();
      // console.log("sensor type : ",sensorType);
      if (sensorType === 'LDR') {
        // if (msgJson.ldr && msgJson.ldr > 500) {
        //   this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_ON');
        // } else {
        //   this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_OFF');
        // }
        payload.sensorType = SensorType.LDR;
        payload.value = msgJson.ldr;
        payload.sensorCode = sensorCode;
        this.saveLogData(payload, SensorType.LDR).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
      }

      if (sensorCode.includes('suhu')) {
        const dataSuhu = new SensorLogDTO();
        dataSuhu.sensorType = SensorType.TEMP;
        dataSuhu.sensorCode = sensorCode;
        dataSuhu.value = msgJson.temperature;
        this.saveLogData(dataSuhu, SensorType.TEMP).catch((e) => {
          console.log('Failed to save log data : ', e.message);
        });

        const dataHumidity = new SensorLogDTO();
        dataHumidity.sensorType = SensorType.HUMIDITY;
        dataHumidity.sensorCode = sensorCode.replace('suhu', 'humi');
        dataHumidity.value = msgJson.humidity;
        this.saveLogData(dataHumidity, SensorType.HUMIDITY).catch((e) => {
          console.log('Failed to save log data : ', e.message);
        });
      }

      if (sensorCode.includes('amonia')) {
        let amonia: number = parseFloat(msgJson.amonia);
        if (amonia && amonia > 100) {
          amonia = 0;
        }
        payload.sensorCode = sensorCode;
        payload.sensorType = SensorType.GAS;
        payload.value = amonia;
        this.saveLogData(payload, SensorType.GAS).catch((e) =>
          console.log('Failed to save log data : ', e.message),
        );
      }

      await this.checkRelay().catch((e) => {
        console.log('Failed to check relay data : ', e);
      });
    }
  }

  async checkRelay() {
    const devices = await this.prismaService.iotSensor.findMany({
      where: { deletedAt: null },
    });
    for (const device of devices) {
      const result = await this.prismaService.sensorDevice.groupBy({
        by: ['type'],
        where: {
          deviceId: device.id,
        },
        _max: {
          lastestValue: true,
        },
      });

      // Transform the result to match the desired format
      const transformedResult = result.map((item) => ({
        type: item.type,
        value: item._max.lastestValue,
      }));

      const ldrEntry = transformedResult.find((item) => item.type === 'LDR');
      const amoniaEntry = transformedResult.find((item) => item.type === 'GAS');
      const tempEntry = transformedResult.find((item) => item.type === 'TEMP');
      let relay1Condition = 0;
      let relay2Condition = 0;
      const humidityEntry = transformedResult.find(
        (item) => item.type === 'HUMIDITY',
      );
      const lastRelay1Log = await this.prismaService.relayLog.findFirst({
        where: {
          sensorId: device.id,
          relayNumber: 1,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const lastRelay2Log = await this.prismaService.relayLog.findFirst({
        where: {
          sensorId: device.id,
          relayNumber: 2,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (ldrEntry && ldrEntry.value! < 3000) {
        this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_OFF');
      } else {
        this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY1_ON');
        relay1Condition = 1;
      }
      setTimeout(() => {}, 1000);
      const amoniaValue = amoniaEntry ? amoniaEntry.value : 0;
      const tempValue = tempEntry ? tempEntry.value : 0;
      const humiValue = humidityEntry ? humidityEntry.value : 0;

      if (
        amoniaValue! > device.amoniaThreshold! ||
        tempValue! > device.tempThreshold ||
        humiValue! > device.humidityThreshold
      ) {
        this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY2_ON');
        relay2Condition = 1;
      } else {
        this.mqtt.publish('d-farm/' + this.sensorId, 'RELAY2_OFF');
      }

      // Save data relay log
      if (!lastRelay1Log) {
        await this.prismaService.relayLog.create({
          data: {
            relayNumber: 1,
            sensorId: device.id,
            amonia: amoniaValue,
            humidity: humiValue,
            temperature: tempValue,
            ldrValue: ldrEntry?.value,
            status: relay1Condition,
            relayDesc: `Lampu ${relay1Condition == 0 ? 'Dimatikan' : 'Dinyalakan'}`,
          },
        });
      } else {
        if (relay1Condition != lastRelay1Log.status) {
          await this.prismaService.relayLog.create({
            data: {
              relayNumber: 1,
              sensorId: device.id,
              amonia: amoniaValue,
              humidity: humiValue,
              temperature: tempValue,
              ldrValue: ldrEntry?.value,
              status: relay1Condition,
              relayDesc: `Lampu ${relay1Condition == 0 ? 'Dimatikan' : 'Dinyalakan'}`,
            },
          });
        }
      }

      if (!lastRelay2Log) {
        await this.prismaService.relayLog.create({
          data: {
            relayNumber: 2,
            sensorId: device.id,
            amonia: amoniaValue,
            humidity: humiValue,
            temperature: tempValue,
            ldrValue: ldrEntry?.value,
            status: relay2Condition,
            relayDesc: `Kipas ${relay2Condition == 0 ? 'Dimatikan' : 'Dinyalakan'} Suhu(${tempValue}, Humidity(${humiValue}), Amonia(${amoniaValue}))`,
          },
        });
      } else {
        if (relay2Condition != lastRelay2Log.status) {
          await this.prismaService.relayLog.create({
            data: {
              relayNumber: 2,
              sensorId: device.id,
              amonia: amoniaValue,
              humidity: humiValue,
              temperature: tempValue,
              ldrValue: ldrEntry?.value,
              status: relay2Condition,
              relayDesc: `Kipas ${relay2Condition == 0 ? 'Dimatikan' : 'Dinyalakan'} Suhu(${tempValue}, Humidity(${humiValue}), Amonia(${amoniaValue}))`,
            },
          });
        }
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
      const sensor = await this.prismaService.sensorDevice.findFirst({
        where: { code: payload.sensorCode, type },
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
            iotSensorId: sensor?.deviceId ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        await this.prismaService.sensorDevice.update({
          where: {
            id: sensor.id,
          },
          data: {
            lastestValue: payload.value,
            lastUpdatedAt: new Date().getTime(),
          },
        });
      }

      return true;
    } catch (e) {
      console.log('Failed to save log data : ', e.message);
      // throw new Error(e);
    }
  }

  async getTemperatureChartDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const type = SensorType.TEMP;
    return await this.getSensorData(filter, user, type);
  }

  async getAmoniaChartDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const type = SensorType.GAS;
    return await this.getSensorData(filter, user, type);
  }

  async getHumidityDaily(filter: ChartFilterDTO, user: JWTClaim) {
    const type = SensorType.HUMIDITY;
    return await this.getSensorData(filter, user, type);
  }

  async getLdrData(filter: ChartFilterDTO, user: JWTClaim) {
    const filterTanggal = filter.tanggal
      ? new Date(filter.tanggal)
      : new Date();
    let cageIds: any = [];

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
    }

    const models = await this.prismaService.sensorDevice.findMany({
      where: {
        IotSensor: {
          cageId: {
            in: cageIds,
          },
        },
        type: 'LDR',
      },
      include: {
        IotSensor: true,
      },
    });

    return {
      status: HttpStatus.OK,
      message: 'Success get ldr status',
      data: models,
    };
  }

  async getSensorData(
    filter: ChartFilterDTO,
    user: JWTClaim,
    type: SensorType,
  ) {
    const filterTanggal = filter.tanggal
      ? new Date(filter.tanggal)
      : new Date();
    const startOfDay = filterTanggal.setHours(0, 0, 0, 0);
    let cageIds: any = [];

    if (user.siteId) {
      const cages = await this.prismaService.cage.findMany({
        where: {
          siteId: user.siteId,
        },
      });
      cageIds = cages.map((x) => x.id);
    }

    if (filter.cageId && filter.cageId != '') {
      cageIds = [filter.cageId];
    }

    // const data: any = await this.prismaService.$queryRaw`
    // SELECT 
    //   DATE_TRUNC('hour', "SensorLog"."createdAt") as hour,
    //   AVG(value) as average_value
    // FROM "SensorLog" 
    // LEFT JOIN "SensorDevice" on "SensorDevice"."id" = "SensorLog"."sensorId"
    // LEFT JOIN "IotSensor" on "IotSensor"."id" = "SensorDevice"."deviceId"
    // WHERE "epoch" >= ${startOfDay}
    // AND "SensorDevice"."type" = ${type}::"SensorType"
    // ${cageIds.length > 0 ? Prisma.sql`AND "IotSensor"."cageId" IN (${Prisma.join(cageIds)})` : Prisma.empty}
    // GROUP BY DATE_TRUNC('hour', "SensorLog"."createdAt")
    // ORDER BY hour ASC`;

  const data: any = await this.prismaService.$queryRaw`
  SELECT 
    to_char(DATE_TRUNC('hour', to_timestamp(cast("SensorLog"."epoch"/1000 as bigint))), 'YYYY-MM-DD HH24:MI:SS') as hour,
    AVG(value) as average_value
  FROM "SensorLog" 
  LEFT JOIN "SensorDevice" on "SensorDevice"."id" = "SensorLog"."sensorId"
  LEFT JOIN "IotSensor" on "IotSensor"."id" = "SensorDevice"."deviceId"
  WHERE "epoch" >= ${startOfDay}
  AND "SensorDevice"."type" = ${type}::"SensorType"
  ${cageIds.length > 0 ? Prisma.sql`AND "IotSensor"."cageId" IN (${Prisma.join(cageIds)})` : Prisma.empty}
  GROUP BY to_char(DATE_TRUNC('hour', to_timestamp(cast("SensorLog"."epoch"/1000 as bigint))), 'YYYY-MM-DD HH24:MI:SS')
  ORDER BY hour ASC`;

    // Format data untuk ApexCharts
    const formattedData = data.map((item) => {
      const date = moment(item.hour);
      return {
        x: `${date.format('HH:mm')}`,
        y: Number(item.average_value.toFixed(2)),
      };
    });
    const where = {
      type: type,
    };
    if (filter.cageId && filter.cageId != '') {
      Object.assign(where, {
        IotSensor: {
          cageId: filter.cageId,
        },
      });
    }

    if (cageIds && cageIds.length > 0) {
      Object.assign(where, {
        IotSensor: {
          cageId: {
            in: cageIds,
          },
        },
      });
    }

    const sensors = await this.prismaService.sensorDevice.findMany({
      where,
      include: {
        IotSensor: {
          where: {
            cageId: {
              in: cageIds,
            },
          },
        },
      },
    });
    const average =
      sensors.reduce((sum, temp) => sum + (temp.lastestValue ?? 0), 0) /
      sensors.length;
    return {
      status: HttpStatus.OK,
      message: 'Success get data',
      data: {
        average,
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
