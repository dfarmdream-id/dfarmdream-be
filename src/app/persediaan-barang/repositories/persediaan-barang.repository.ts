import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma, TipeBarang } from '@prisma/client';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../dtos';
import { FilterPersediaanBarangDTO } from '../dtos/filter-persediaan-barang.dto';
import { FilterTransaksiBarangDTO } from '../dtos/filter-transaksi-barang.dto';

export type Filter = {
  where?: Prisma.PersediaanPakanObatWhereInput;
  orderBy?: Prisma.PersediaanPakanObatOrderByWithRelationInput;
  cursor?: Prisma.PersediaanPakanObatWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.PersediaanPakanObatInclude;
};

export type FilterTransaksi = {
  where?: Prisma.KartuStokBarangWhereInput;
  orderBy?: Prisma.KartuStokBarangOrderByWithRelationInput;
  cursor?: Prisma.KartuStokBarangWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.KartuStokBarangInclude;
};

@Injectable()
export class PersediaanBarangRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: FilterPersediaanBarangDTO, filter?: Filter) {
    const { limit = 10, page = 1, q, tipeBarang } = paginateDto;

    let where: any = {
      deletedAt: null,
      ...filter?.where,
    };

    if (tipeBarang && tipeBarang != '') {
      where = {
        ...where,
        goods: {
          type: TipeBarang[tipeBarang],
        },
      };
    }

    if (q && q != '') {
      where = {
        ...where,
        OR: [
          {
            goods: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
          {
            site: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
          {
            cage: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
          // { tipeBarang: { contains: q, mode: 'insensitive' } },
        ],
      };
    }

    return from(
      this.prismaService.$transaction([
        this.prismaService.persediaanPakanObat.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: {
            site: true,
            cage: true,
            goods: true,
          },
        }),
        this.prismaService.persediaanPakanObat.count({
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

  public paginateTransaksi(
    paginateDto: FilterTransaksiBarangDTO,
    filter?: FilterTransaksi,
  ) {
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
            barang: {
              namaBarang: { contains: q, mode: 'insensitive' },
            },
          },
          {
            site: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
          {
            cage: {
              name: { contains: q, mode: 'insensitive' },
            },
          },
        ],
      };
    }

    return from(
      this.prismaService.$transaction([
        this.prismaService.kartuStokBarang.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: {
            ...filter?.orderBy,
            tanggal: 'desc',
          },
          cursor: filter?.cursor,
          include: {
            site: true,
            cage: true,
            barang: {
              include: {
                goods: true,
              },
            },
            batch: true,
            karyawan: true,
          },
        }),
        this.prismaService.kartuStokBarang.count({
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

  public create(data: CreatePersediaanBarang) {
    return from(
      this.prismaService.persediaanPakanObat.create({
        data: {
          goodsId: data.goodId,
          qty: data.qty,
          cageId: data.cageId,
          siteId: data.siteId,
          harga: data.harga,
          total: data.harga * data.qty,
          status: 1,
        },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.PersediaanPakanObatWhereUniqueInput,
    data: UpdatePersediaanBarangDTO,
  ) {
    return from(
      this.prismaService.persediaanPakanObat.update({
        where,
        data: {
          qty: data.qty,
          cageId: data.cageId,
          siteId: data.siteId,
          harga: data.harga,
          total: data.harga! * data.qty!,
          status: 1,
          goodsId: data.goodId,
        },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.PersediaanPakanObatWhereUniqueInput) {
    return from(
      this.prismaService.persediaanPakanObat.update({
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
    where: Prisma.PersediaanPakanObatWhereUniqueInput,
    select?: Prisma.PersediaanPakanObatSelect,
  ) {
    return from(
      this.prismaService.persediaanPakanObat.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.PersediaanPakanObatWhereUniqueInput,
    select?: Prisma.PersediaanPakanObatSelect,
  ) {
    return from(
      this.prismaService.persediaanPakanObat.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.persediaanPakanObat.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.persediaanPakanObat.count(filter)).pipe(
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
