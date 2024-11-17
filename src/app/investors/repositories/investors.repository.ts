import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.InvestorWhereInput;
  orderBy?: Prisma.InvestorOrderByWithRelationInput;
  cursor?: Prisma.InvestorWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.InvestorInclude;
};

@Injectable()
export class InvestorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(this.prismaService.$transaction([
      this.prismaService.investor.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        where: filter?.where,
        orderBy: filter?.orderBy,
        cursor: filter?.cursor,
        include: filter?.include,
      }),
      this.prismaService.investor.count({
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

  public create(data: Prisma.InvestorCreateInput) {
    return from(this.prismaService.investor.create({ data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.InvestorWhereUniqueInput,
    data: Prisma.InvestorUpdateInput,
  ) {
    return from(this.prismaService.investor.update({ where, data })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(
    where: Prisma.InvestorWhereUniqueInput,
  ) {
    return from(this.prismaService.investor.update({
      where,
      data: { deletedAt: new Date() },
    })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public first(
    where: Prisma.InvestorWhereUniqueInput,
    select?: Prisma.InvestorSelect,
  ) {
    return from(this.prismaService.investor.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.InvestorWhereUniqueInput,
    select?: Prisma.InvestorSelect,
  ) {
    return from(this.prismaService.investor.findUnique({ where, select })).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.investor.findMany(filter)).pipe(
           catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.investor.count(filter)).pipe(
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

