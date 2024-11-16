import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.PermissionWhereInput;
  orderBy?: Prisma.PermissionOrderByWithRelationInput;
  cursor?: Prisma.PermissionWhereUniqueInput;
  take?: number;
  skip?: number;
};

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.permission.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
        }),
        this.prismaService.permission.count({
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
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public create(data: Prisma.PermissionCreateInput) {
    return from(this.prismaService.permission.create({ data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public update(
    where: Prisma.PermissionWhereUniqueInput,
    data: Prisma.PermissionUpdateInput,
  ) {
    return from(this.prismaService.permission.update({ where, data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public delete(where: Prisma.PermissionWhereUniqueInput) {
    return from(
      this.prismaService.permission.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public first(
    where: Prisma.PermissionWhereUniqueInput,
    select?: Prisma.PermissionSelect,
  ) {
    return from(
      this.prismaService.permission.findUnique({ where, select }),
    ).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.PermissionWhereUniqueInput,
    select?: Prisma.PermissionSelect,
  ) {
    return from(
      this.prismaService.permission.findUnique({ where, select }),
    ).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.permission.findMany(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.permission.count(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public any(filter: Omit<Filter, 'include'>) {
    return this.count(filter).pipe(
      map((count) => count > 0),
      catchError(() => {
        throw new Error();
      }),
    );
  }
}
