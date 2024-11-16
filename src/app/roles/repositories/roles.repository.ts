import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.RoleWhereInput;
  orderBy?: Prisma.RoleOrderByWithRelationInput;
  cursor?: Prisma.RoleWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.RoleInclude;
};

@Injectable()
export class RolesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.role.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.role.count({
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

  public create(data: Prisma.RoleCreateInput) {
    return from(this.prismaService.role.create({ data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public update(
    where: Prisma.RoleWhereUniqueInput,
    data: Prisma.RoleUpdateInput,
  ) {
    return from(this.prismaService.role.update({ where, data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public delete(where: Prisma.RoleWhereUniqueInput) {
    return from(
      this.prismaService.role.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public first(where: Prisma.RoleWhereUniqueInput, select?: Prisma.RoleSelect) {
    return from(this.prismaService.role.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.RoleWhereUniqueInput,
    select?: Prisma.RoleSelect,
  ) {
    return from(this.prismaService.role.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.role.findMany(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.role.count(filter)).pipe(
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
