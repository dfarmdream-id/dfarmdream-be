import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.JournalDetailWhereInput;
  orderBy?: Prisma.JournalDetailOrderByWithRelationInput;
  cursor?: Prisma.JournalDetailWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.JournalDetailInclude;
};

@Injectable()
export class JournalDetailRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.journalDetail.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.journalDetail.count({
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

  public create(data: Prisma.JournalDetailCreateInput) {
    return from(this.prismaService.journalDetail.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.JournalDetailWhereUniqueInput,
    data: Prisma.JournalDetailUpdateInput,
  ) {
    return from(this.prismaService.journalDetail.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.JournalDetailWhereUniqueInput) {
    return from(
      this.prismaService.journalDetail.update({
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
    where: Prisma.JournalDetailWhereUniqueInput,
    select?: Prisma.JournalDetailSelect,
  ) {
    return from(
      this.prismaService.journalDetail.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.JournalDetailWhereUniqueInput,
    select?: Prisma.JournalDetailSelect,
  ) {
    return from(
      this.prismaService.journalDetail.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.journalDetail.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.journalDetail.count(filter)).pipe(
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

  async upsert(data: {
    where: Prisma.JournalDetailWhereUniqueInput;
    create: Prisma.JournalDetailCreateInput;
    update: Prisma.JournalDetailUpdateInput;
  }) {
    return this.prismaService.journalDetail.upsert({
      where: data.where,
      create: data.create,
      update: data.update,
    });
  }
}
