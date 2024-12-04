import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.CctvCameraWhereInput;
  orderBy?: Prisma.CctvCameraOrderByWithRelationInput;
  cursor?: Prisma.CctvCameraWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.CctvCameraInclude;
};

@Injectable()
export class CctvCameraRepository {
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
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
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
        this.prismaService.cctvCamera.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          // include: filter?.include,
          include: {
            cage: true,
          },
        }),
        this.prismaService.cctvCamera.count({
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

  public create(data: Prisma.CctvCameraCreateInput) {
    return from(this.prismaService.cctvCamera.create({ data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.CctvCameraWhereUniqueInput,
    data: Prisma.CctvCameraUpdateInput,
  ) {
    return from(this.prismaService.cctvCamera.update({ where, data })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.CctvCameraWhereUniqueInput) {
    return from(
      this.prismaService.cctvCamera.update({
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
    where: Prisma.CctvCameraWhereUniqueInput,
    select?: Prisma.CctvCameraSelect,
  ) {
    return from(
      this.prismaService.cctvCamera.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public getByCage(cageId: string) {
    return from(
      this.prismaService.cctvCamera.findMany({
        where: {
          cageId: cageId,
          deletedAt: null,
        },
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.CctvCameraWhereUniqueInput,
    select?: Prisma.CctvCameraSelect,
  ) {
    return from(
      this.prismaService.cctvCamera.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.cctvCamera.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.cctvCamera.count(filter)).pipe(
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
