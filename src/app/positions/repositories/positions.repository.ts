import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.PositionWhereInput;
  orderBy?: Prisma.PositionOrderByWithRelationInput;
  cursor?: Prisma.PositionWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.PositionInclude;
};

@Injectable()
export class PositionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(this.prismaService.$transaction([
      this.prismaService.position.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        where: filter?.where,
        orderBy: filter?.orderBy,
        cursor: filter?.cursor,
        include: filter?.include,
      }),
      this.prismaService.position.count({
        where: filter?.where,
      }),
    ])).pipe(
      map(([data, count]) => new PaginatedEntity(data, {
        limit,
        page,
        totalData: count,
      })),
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public create(data: Prisma.PositionCreateInput) {
    return from(this.prismaService.position.create({ data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public update(
    where: Prisma.PositionWhereUniqueInput,
    data: Prisma.PositionUpdateInput,
  ) {
    return from(this.prismaService.position.update({ where, data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public delete(
    where: Prisma.PositionWhereUniqueInput,
  ) {
    return from(this.prismaService.position.update({
      where,
      data: { deletedAt: new Date() },
    })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public first(
    where: Prisma.PositionWhereUniqueInput,
    select?: Prisma.PositionSelect,
  ) {
    return from(this.prismaService.position.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.PositionWhereUniqueInput,
    select?: Prisma.PositionSelect,
  ) {
    return from(this.prismaService.position.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.position.findMany(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.position.count(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public any(filter: Omit<Filter, 'include'>) {
    return this.count(filter).pipe(
      map(count => count > 0),
      catchError(() => {
        throw new Error();
      }),
    );
  }
}

