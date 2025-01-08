import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.KategoriBiayaWhereInput;
  orderBy?: Prisma.KategoriBiayaOrderByWithRelationInput;
  cursor?: Prisma.KategoriBiayaWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.KategoriBiayaInclude;
};

@Injectable()
export class KategoriBiayaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1, q } = paginateDto;

    let where: any = {
      deletedAt: null,
      ...filter?.where,
    };

    if (q && q != '') {
      where = {
        ...where,
        OR: [
          { namaKategori: { contains: q, mode: 'insensitive' } },
          { kodeAkun: { contains: q, mode: 'insensitive' } },
        ],
      };
    }
    return from(
      this.prismaService.$transaction([
        this.prismaService.kategoriBiaya.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
        }),
        this.prismaService.kategoriBiaya.count({
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

  public create(data: Prisma.KategoriBiayaCreateInput) {
    return from(this.prismaService.kategoriBiaya.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.KategoriBiayaWhereUniqueInput,
    data: Prisma.KategoriBiayaUpdateInput,
  ) {
    return from(this.prismaService.kategoriBiaya.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.KategoriBiayaWhereUniqueInput) {
    return from(
      this.prismaService.kategoriBiaya.update({
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
    where: Prisma.KategoriBiayaWhereUniqueInput,
    select?: Prisma.KategoriBiayaSelect,
  ) {
    return from(
      this.prismaService.kategoriBiaya.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.KategoriBiayaWhereUniqueInput,
    select?: Prisma.KategoriBiayaSelect,
  ) {
    return from(
      this.prismaService.kategoriBiaya.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.kategoriBiaya.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.kategoriBiaya.count(filter)).pipe(
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
