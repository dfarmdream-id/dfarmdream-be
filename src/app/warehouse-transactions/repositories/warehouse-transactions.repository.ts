import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.WarehouseTransactionWhereInput;
  orderBy?: Prisma.WarehouseTransactionOrderByWithRelationInput;
  cursor?: Prisma.WarehouseTransactionWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.WarehouseTransactionInclude;
};

@Injectable()
export class WarehouseTransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.warehouseTransaction.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.warehouseTransaction.count({
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

  public create(data: Prisma.WarehouseTransactionCreateInput) {
    return from(this.prismaService.warehouseTransaction.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.WarehouseTransactionWhereUniqueInput,
    data: Prisma.WarehouseTransactionUpdateInput,
  ) {
    return from(
      this.prismaService.warehouseTransaction.update({ where, data }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.WarehouseTransactionWhereUniqueInput) {
    return from(
      this.prismaService.warehouseTransaction.update({
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
    where: Prisma.WarehouseTransactionWhereUniqueInput,
    select?: Prisma.WarehouseTransactionSelect,
  ) {
    return from(
      this.prismaService.warehouseTransaction.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.WarehouseTransactionWhereUniqueInput,
    select?: Prisma.WarehouseTransactionSelect,
  ) {
    return from(
      this.prismaService.warehouseTransaction.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.warehouseTransaction.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.warehouseTransaction.count(filter)).pipe(
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

  public sum(field: string, where: Prisma.WarehouseTransactionWhereInput) {
    return from(
      this.prismaService.warehouseTransaction.aggregate({
        _sum: { [field]: true },
        where,
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
