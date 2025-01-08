import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.JournalTypeWhereInput;
  orderBy?: Prisma.JournalTypeOrderByWithRelationInput;
  cursor?: Prisma.JournalTypeWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.JournalTypeInclude;
};

@Injectable()
export class JournalTypesRepository {
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
          ...(paginateDto.q.match(/^[0-9]+$/)
            ? [{ code: parseInt(paginateDto.q) }]
            : []),
          { name: { contains: paginateDto.q, mode: 'insensitive' } },
        ],
      };
    }

    return from(
      this.prismaService.$transaction([
        this.prismaService.journalType.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: {
            ...filter?.orderBy,
            code: 'asc',
          },
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.journalType.count({
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

  public create(data: Prisma.JournalTypeCreateInput) {
    return from(this.prismaService.journalType.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.JournalTypeWhereUniqueInput,
    data: Prisma.JournalTypeUpdateInput,
  ) {
    return from(this.prismaService.journalType.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.JournalTypeWhereUniqueInput) {
    return from(
      this.prismaService.journalType.update({
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
    where: Prisma.JournalTypeWhereUniqueInput,
    select?: Prisma.JournalTypeSelect,
  ) {
    return from(
      this.prismaService.journalType.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.JournalTypeWhereUniqueInput,
    include?: Prisma.JournalTypeInclude,
  ) {
    return from(
      this.prismaService.journalType.findUnique({
        where,
        include, // Gunakan hanya include
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.journalType.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.journalType.count(filter)).pipe(
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
