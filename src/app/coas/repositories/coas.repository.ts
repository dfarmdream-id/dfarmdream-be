import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { CreateCoasDto, UpdateCoasDto } from '../dtos';

export type Filter = {
  where?: Prisma.CoaWhereInput;
  orderBy?: Prisma.CoaOrderByWithRelationInput;
  cursor?: Prisma.CoaWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class CoasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1, q } = paginateDto;
    const where = {
      ...filter?.where,
      deletedAt: null,
    };

    if (q && q != '') {
      const orArray: any = [
        { name: { contains: q, mode: 'insensitive' } },
        { group: { name: { contains: q, mode: 'insensitive' } } },
      ];
      if (!isNaN(parseInt(q))) {
        orArray.push({
          code: parseInt(q),
        });
      }
      Object.assign(where, {
        OR: [...orArray],
      });
    }
    return from(
      this.prismaService.$transaction([
        this.prismaService.coa.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: [
            { level: 'asc' }, // Urutkan berdasarkan level (parent dulu, baru child)
            { code: 'asc' }, // Urutkan berdasarkan kode (agar parent-child terstruktur)
          ],
          cursor: filter?.cursor,
          include: {
            group: true,
          },
        }),
        this.prismaService.coa.count({
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

  public create(data: CreateCoasDto) {
    return from(this.prismaService.coa.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(where: Prisma.CoaWhereUniqueInput, data: UpdateCoasDto) {
    return from(
      this.prismaService.coa.update({
        where,
        data: {
          ...data,
        },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.CoaWhereUniqueInput) {
    return from(
      this.prismaService.coa.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public first(where: Prisma.CoaWhereUniqueInput, select?: Prisma.CoaSelect) {
    return from(this.prismaService.coa.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.CoaWhereUniqueInput,
    select?: Prisma.CoaSelect,
  ) {
    return from(this.prismaService.coa.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.coa.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.coa.count(filter)).pipe(
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
