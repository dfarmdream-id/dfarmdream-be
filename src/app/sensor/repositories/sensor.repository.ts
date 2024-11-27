import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.IotSensorWhereInput;
  orderBy?: Prisma.IotSensorOrderByWithRelationInput;
  cursor?:Prisma.IotSensorWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.IotSensorInclude;
};

@Injectable()
export class SensorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { q,limit = 10, page = 1 } = paginateDto;
    let where ={}
    if(q && q!=''){
      let orFilter:any = []
      
      if(q && !isNaN(parseFloat(q))){
        orFilter = [
          ...orFilter,
          { tempThreshold: { equals: parseFloat(q) }},
          { humidityThreshold: { equals: parseFloat(q) }},
          { amoniaThreshold: { equals: parseFloat(q) }}
        ]
      }
      where = {
        ...where,
        OR:[
          { code: { contains: q, mode: 'insensitive' } },
          { cage:{
            name: { contains: q, mode: 'insensitive' } 
          }},
          ...orFilter
        ]
      }
    }
    return from(this.prismaService.$transaction([
      this.prismaService.iotSensor.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        where: where,
        orderBy: filter?.orderBy,
        cursor: filter?.cursor,
        include: {
          cage:true
        },
      }),
      this.prismaService.iotSensor.count({
        where: {
          ...filter?.where,
          deletedAt:null
        },
      }),
    ])).pipe(
      map(([data, count]) => new PaginatedEntity(data, {
        limit,
        page,
        totalData: count,
      })),
           catchError((error) => {
        throw error;
      }),
    );
  }

  public create(data: Prisma.IotSensorCreateInput) {
    return from(this.prismaService.iotSensor.create({ data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.IotSensorWhereUniqueInput,
    data: Prisma.IotSensorUpdateInput,
  ) {
    return from(this.prismaService.iotSensor.update({ where, data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(
    where: Prisma.IotSensorWhereUniqueInput,
  ) {
    return from(this.prismaService.iotSensor.delete({
      where
    })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public first(
    where: Prisma.IotSensorWhereUniqueInput,
    select?: Prisma.IotSensorSelect,
  ) {
    return from(this.prismaService.iotSensor.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.IotSensorWhereUniqueInput,
    select?: Prisma.IotSensorSelect,
  ) {
    return from(this.prismaService.iotSensor.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.iotSensor.findMany(filter)).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.iotSensor.count(filter)).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public any(filter: Omit<Filter, 'include'>) {
    return this.count(filter).pipe(
      map(count => count > 0),
           catchError((error) => {
        throw error;
      }),
    );
  }
}

