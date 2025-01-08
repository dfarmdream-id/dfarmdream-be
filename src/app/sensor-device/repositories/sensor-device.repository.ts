import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from '@src/common/entities/paginated.entity';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { catchError, from, map } from 'rxjs';

type Filter = {
  where?: Prisma.SensorDeviceWhereInput;
  orderBy?: Prisma.SensorDeviceOrderByWithRelationInput;
  cursor?: Prisma.SensorDeviceWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.SensorDeviceInclude;
};

@Injectable()
export class SensorDeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { q, limit = 10, page = 1 } = paginateDto;
    let where = {
      ...filter?.where,
    };
    if (q && q != '') {
      let orFilter: any = [];

      if (q && !isNaN(parseFloat(q))) {
        orFilter = [...orFilter, { lastestValue: { equals: parseFloat(q) } }];
      }
      where = {
        ...where,
        OR: [{ code: { contains: q, mode: 'insensitive' } }, ...orFilter],
      };
    }
    return from(
      this.prismaService.$transaction([
        this.prismaService.sensorDevice.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy ?? {
            createdAt: 'desc',
          },
          cursor: filter?.cursor,
          include: {
            IotSensor: {
              include: {
                cage: {
                  include: {
                    site: true,
                  },
                },
              },
            },
          },
        }),
        this.prismaService.sensorDevice.count({
          where: {
            ...filter?.where,
          },
        }),
      ]),
    ).pipe(
      map(
        ([data, count]) =>
          new PaginatedEntity(data, {
            limit,
            page,
            totalData: count,
          }),
      ),
      catchError((error) => {
        throw error;
      }),
    );
  }

  public create(data: Prisma.SensorDeviceCreateInput) {
    return from(this.prismaService.sensorDevice.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.SensorDeviceWhereUniqueInput,
    data: Prisma.SensorDeviceUpdateInput,
  ) {
    return from(this.prismaService.sensorDevice.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.SensorDeviceWhereUniqueInput) {
    return from(
      this.prismaService.sensorDevice.delete({
        where,
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public first(
    where: Prisma.SensorDeviceWhereUniqueInput,
    select?: Prisma.SensorDeviceSelect,
  ) {
    return from(
      this.prismaService.sensorDevice.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.SensorDeviceWhereUniqueInput,
    select?: Prisma.SensorDeviceSelect,
  ) {
    return from(
      this.prismaService.sensorDevice.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.sensorDevice.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.sensorDevice.count(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public any(filter: Omit<Filter, 'include'>) {
    return this.count(filter).pipe(
      map((count) => count > 0),
      catchError((error) => {
        throw error;
      }),
    );
  }
}
