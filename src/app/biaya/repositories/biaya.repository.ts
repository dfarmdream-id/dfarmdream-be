import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { CreateBiayaDTO } from '../dtos';

export type Filter = {
  where?: Prisma.BiayaWhereInput;
  orderBy?: Prisma.BiayaOrderByWithRelationInput;
  cursor?: Prisma.BiayaWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.BiayaInclude;
};

@Injectable()
export class BiayaRepository {
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
          {
            kategoriBiaya: {
              namaKategori: { contains: q, mode: 'insentive' },
            },
          },
          { tanggal: { contains: q, mode: 'insentive' } },
          { keterangan: { contains: q, mode: 'insentive' } },
          {
            cage: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
          {
            site: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
        ],
      };
    }
    return from(
      this.prismaService.$transaction([
        this.prismaService.biaya.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          // include: filter?.include,
          include: {
            cage: true,
            kategoriBiaya: true,
            site: true,
            user: true,
          },
        }),
        this.prismaService.biaya.count({
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

  public create(data: CreateBiayaDTO) {
    return from(this.prismaService.biaya.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.BiayaWhereUniqueInput,
    data: Prisma.BiayaUpdateInput,
  ) {
    return from(this.prismaService.biaya.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.BiayaWhereUniqueInput) {
    return from(
      this.prismaService.biaya.update({
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
    where: Prisma.BiayaWhereUniqueInput,
    select?: Prisma.BiayaSelect,
  ) {
    return from(this.prismaService.biaya.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.BiayaWhereUniqueInput,
    select?: Prisma.BiayaSelect,
  ) {
    return from(this.prismaService.biaya.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.biaya.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.biaya.count(filter)).pipe(
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
