import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.JournalTemplateWhereInput;
  orderBy?: Prisma.JournalTemplateOrderByWithRelationInput;
  cursor?: Prisma.JournalTemplateWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.JournalTemplateInclude;
};

@Injectable()
export class JournalTemplatesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    let where = {
      ...filter?.where,
      deletedAt: null,
    };

    if (paginateDto.q && paginateDto.q != '') {
      where = {
        ...where,
        OR: [
          {
            code: {
              contains: paginateDto.q,
            },
          },
          { name: { contains: paginateDto.q, mode: 'insensitive' } },
        ],
      };
    }

    return from(
      this.prismaService.$transaction([
        this.prismaService.journalTemplate.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.journalTemplate.count({
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

  public create(data: Prisma.JournalTemplateCreateInput) {
    return from(this.prismaService.journalTemplate.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.JournalTemplateWhereUniqueInput,
    data: Prisma.JournalTemplateUpdateInput,
  ) {
    return from(
      this.prismaService.journalTemplate.update({ where, data }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.JournalTemplateWhereUniqueInput) {
    return from(
      this.prismaService.journalTemplate.update({
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
    where: Prisma.JournalTemplateWhereUniqueInput,
    select?: Prisma.JournalTemplateSelect,
  ) {
    return from(
      this.prismaService.journalTemplate.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.JournalTemplateWhereUniqueInput,
    select?: Prisma.JournalTemplateSelect,
  ) {
    return from(
      this.prismaService.journalTemplate.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.journalTemplate.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.journalTemplate.count(filter)).pipe(
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

  public findFirst(where: Prisma.JournalTemplateWhereInput) {
    return this.prismaService.journalTemplate.findFirst({
      where,
      include: {
        journalTemplateDetails: {
          where: {
            deletedAt: null, // Filter hanya yang tidak terhapus
          },
          select: {
            id: true,
            typeLedger: true,
            status: true,
            coa: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
