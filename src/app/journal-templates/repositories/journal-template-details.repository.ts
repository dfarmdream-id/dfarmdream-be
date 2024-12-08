import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.JournalTemplateDetailWhereInput;
  orderBy?: Prisma.JournalTemplateDetailOrderByWithRelationInput;
  cursor?: Prisma.JournalTemplateDetailWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class JournalTemplateDetailsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.journalTemplateDetail.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          // include: filter?.include,
        }),
        this.prismaService.journalTemplateDetail.count({
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

  public create(data: Prisma.JournalTemplateDetailCreateInput) {
    return from(this.prismaService.journalTemplateDetail.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.JournalTemplateDetailWhereUniqueInput,
    data: Prisma.JournalTemplateDetailUpdateInput,
  ) {
    return from(
      this.prismaService.journalTemplateDetail.update({ where, data }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.JournalTemplateDetailWhereUniqueInput) {
    return from(
      this.prismaService.journalTemplateDetail.update({
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
    where: Prisma.JournalTemplateDetailWhereUniqueInput,
    select?: Prisma.JournalTemplateDetailSelect,
  ) {
    return from(
      this.prismaService.journalTemplateDetail.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.JournalTemplateDetailWhereUniqueInput,
    select?: Prisma.JournalTemplateDetailSelect,
  ) {
    return from(
      this.prismaService.journalTemplateDetail.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.journalTemplateDetail.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.journalTemplateDetail.count(filter)).pipe(
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
    where: Prisma.JournalTemplateDetailWhereUniqueInput;
    create: Prisma.JournalTemplateDetailCreateInput;
    update: Prisma.JournalTemplateDetailUpdateInput;
  }) {
    return this.prismaService.journalTemplateDetail.upsert({
      where: data.where,
      create: data.create,
      update: data.update,
    });
  }
}
