import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.GoodsWhereInput;
  orderBy?: Prisma.GoodsOrderByWithRelationInput;
  cursor?: Prisma.GoodsWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class GoodsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1,q  } = paginateDto;
    const where = {
      ...filter?.where,
      deletedAt:null
    }

    if(q && q!=''){
      const orArray:any = [
        { name: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ]
      Object.assign(where,{
        OR: [
          ...orArray
        ]
      })
    }
    return from(
      this.prismaService.$transaction([
        this.prismaService.goods.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: {
            ...filter?.orderBy,
            createdAt:'desc'
          },
          cursor: filter?.cursor,
        }),
        this.prismaService.goods.count({
          where: where,
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

  public create(data: Prisma.GoodsCreateInput) {
    return from(this.prismaService.goods.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.GoodsWhereUniqueInput,
    data: Prisma.GoodsUpdateInput,
  ) {
    return from(this.prismaService.goods.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.GoodsWhereUniqueInput) {
    return from(
      this.prismaService.goods.update({
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
    where: Prisma.GoodsWhereUniqueInput,
    select?: Prisma.GoodsSelect,
  ) {
    return from(this.prismaService.goods.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.GoodsWhereUniqueInput,
    select?: Prisma.GoodsSelect,
  ) {
    return from(this.prismaService.goods.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.goods.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.goods.count(filter)).pipe(
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
