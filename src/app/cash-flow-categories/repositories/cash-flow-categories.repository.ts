import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.CashFlowCategoryWhereInput;
  orderBy?: Prisma.CashFlowCategoryOrderByWithRelationInput;
  cursor?: Prisma.CashFlowCategoryWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class CashFlowCategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.cashFlowCategory.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
        }),
        this.prismaService.cashFlowCategory.count({
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

  public create(data: Prisma.CashFlowCategoryCreateInput) {
    return from(this.prismaService.cashFlowCategory.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.CashFlowCategoryWhereUniqueInput,
    data: Prisma.CashFlowCategoryUpdateInput,
  ) {
    return from(
      this.prismaService.cashFlowCategory.update({ where, data }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.CashFlowCategoryWhereUniqueInput) {
    return from(
      this.prismaService.cashFlowCategory.update({
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
    where: Prisma.CashFlowCategoryWhereUniqueInput,
    select?: Prisma.CashFlowCategorySelect,
  ) {
    return from(
      this.prismaService.cashFlowCategory.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.CashFlowCategoryWhereUniqueInput,
    select?: Prisma.CashFlowCategorySelect,
  ) {
    return from(
      this.prismaService.cashFlowCategory.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.cashFlowCategory.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.cashFlowCategory.count(filter)).pipe(
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
