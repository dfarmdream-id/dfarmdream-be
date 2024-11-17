import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.ChickenCageWhereInput;
  orderBy?: Prisma.ChickenCageOrderByWithRelationInput;
  cursor?: Prisma.ChickenCageWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.ChickenCageInclude;
};

@Injectable()
export class ChickenCagesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.chickenCage.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.chickenCage.count({
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

  public create(data: Prisma.ChickenCageCreateInput) {
    return from(this.prismaService.chickenCage.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.ChickenCageWhereUniqueInput,
    data: Prisma.ChickenCageUpdateInput,
  ) {
    return from(this.prismaService.chickenCage.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.ChickenCageWhereUniqueInput) {
    return from(
      this.prismaService.chickenCage.update({
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
    where: Prisma.ChickenCageWhereUniqueInput,
    select?: Prisma.ChickenCageSelect,
  ) {
    return from(
      this.prismaService.chickenCage.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.ChickenCageWhereUniqueInput,
    select?: Prisma.ChickenCageSelect,
  ) {
    return from(
      this.prismaService.chickenCage.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.chickenCage.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.chickenCage.count(filter)).pipe(
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
