import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.CityWhereInput;
  orderBy?: Prisma.CityOrderByWithRelationInput;
  cursor?: Prisma.CityWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.CityInclude;
};

@Injectable()
export class CitiesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(this.prismaService.$transaction([
      this.prismaService.city.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        where: filter?.where,
        orderBy: filter?.orderBy,
        cursor: filter?.cursor,
        include: filter?.include,
      }),
      this.prismaService.city.count({
        where: filter?.where,
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

  public create(data: Prisma.CityCreateInput) {
    return from(this.prismaService.city.create({ data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.CityWhereUniqueInput,
    data: Prisma.CityUpdateInput,
  ) {
    return from(this.prismaService.city.update({ where, data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(
    where: Prisma.CityWhereUniqueInput,
  ) {
    return from(this.prismaService.city.update({
      where,
      data: { deletedAt: new Date() },
    })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public first(
    where: Prisma.CityWhereUniqueInput,
    select?: Prisma.CitySelect,
  ) {
    return from(this.prismaService.city.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.CityWhereUniqueInput,
    select?: Prisma.CitySelect,
  ) {
    return from(this.prismaService.city.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.city.findMany(filter)).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.city.count(filter)).pipe(
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

