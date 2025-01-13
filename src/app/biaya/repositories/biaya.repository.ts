import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { CreateBiayaDTO } from '../dtos';
import { FilterBiayaDto } from '@app/biaya/dtos/filter-biaya.dto';

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

  public paginate(paginateDto: FilterBiayaDto, filter?: Filter) {
    const {
      limit = 10,
      page = 1,
      q,
      batchId,
      cageId,
      dateRange,
      categoryBiayaId,
      goodId,
    } = paginateDto;

    let where: any = {
      deletedAt: null,
      ...filter?.where,
    };

    // Filter untuk pencarian (q)
    if (q && q !== '') {
      where = {
        ...where,
        OR: [
          {
            keterangan: { contains: q, mode: 'insensitive' },
          },
          {
            kategoriBiaya: {
              namaKategori: { contains: q, mode: 'insensitive' },
            },
          },
          { tanggal: { contains: q, mode: 'insensitive' } },
          {
            persediaanPakanObat: {
              goods: {
                name: { contains: q, mode: 'insensitive' },
              },
            },
          },
          {
            batch: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
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

    if (batchId) {
      where = {
        ...where,
        batchId,
      };
    }

    if (cageId) {
      where = {
        ...where,
        cageId,
      };
    }

    if (categoryBiayaId) {
      where = {
        ...where,
        kategoriId: categoryBiayaId,
      };
    }

    if (goodId) {
      where = {
        ...where,
        persediaanPakanObat: {
          goods: {
            id: goodId,
          },
        },
      };
    }

    if (dateRange?.start && dateRange?.end) {
      where = {
        ...where,
        createdAt: {
          gte: new Date(dateRange.start).toISOString(),
          lte: new Date(dateRange.end).toISOString(),
        },
      };
    }

    return from(
      this.prismaService.$transaction([
        this.prismaService.biaya.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: {
            ...filter?.orderBy,
            tanggal: 'desc',
          },
          cursor: filter?.cursor,
          include: {
            cage: true,
            kategoriBiaya: true,
            site: true,
            user: true,
            batch: true,
            persediaanPakanObat: {
              include: {
                goods: true,
              },
            },
          },
        }),
        this.prismaService.biaya.count({
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
