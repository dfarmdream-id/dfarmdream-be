import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.FileWhereInput;
  orderBy?: Prisma.FileOrderByWithRelationInput;
  cursor?: Prisma.FileWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.FileInclude;
};

@Injectable()
export class FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.file.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
        }),
        this.prismaService.file.count({
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

  public create(data: Prisma.FileCreateInput) {
    return from(this.prismaService.file.create({ data })).pipe(
      catchError((err) => {
        throw err;
      }),
    );
  }

  public update(
    where: Prisma.FileWhereUniqueInput,
    data: Prisma.FileUpdateInput,
  ) {
    return from(this.prismaService.file.update({ where, data })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public delete(where: Prisma.FileWhereUniqueInput) {
    return from(
      this.prismaService.file.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public first(where: Prisma.FileWhereUniqueInput, select?: Prisma.FileSelect) {
    return from(this.prismaService.file.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.FileWhereUniqueInput,
    select?: Prisma.FileSelect,
  ) {
    return from(this.prismaService.file.findUnique({ where, select })).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.file.findMany(filter)).pipe(
      catchError(() => {
        throw new Error();
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>) {
    return from(this.prismaService.file.count(filter)).pipe(
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
