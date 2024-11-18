import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.PriceWhereInput;
  orderBy?: Prisma.PriceOrderByWithRelationInput;
  cursor?: Prisma.PriceWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class PricesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.price.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
        }),
        this.prismaService.price.count({
          where: filter?.where,
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

  public create(data: Prisma.PriceCreateInput) {
    return from(this.prismaService.price.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.PriceWhereUniqueInput,
    data: Prisma.PriceUpdateInput,
  ) {
    return from(this.prismaService.price.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.PriceWhereUniqueInput) {
    return from(
      this.prismaService.price.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public first(
    where: Prisma.PriceWhereUniqueInput,
    select?: Prisma.PriceSelect,
  ) {
    return from(this.prismaService.price.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.PriceWhereUniqueInput,
    select?: Prisma.PriceSelect,
  ) {
    return from(this.prismaService.price.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.price.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.price.count(filter)).pipe(
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
