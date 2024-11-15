import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.BlogWhereInput;
  orderBy?: Prisma.BlogOrderByWithRelationInput;
  cursor?: Prisma.BlogWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.BlogInclude;
};

@Injectable()
export class BlogsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public paginate(paginateDto: PaginationQueryDto, filter?: Filter) {
    const { limit = 10, page = 1 } = paginateDto;

    return from(
      this.prismaService.$transaction([
        this.prismaService.blog.findMany({
          take: +limit,
          where: filter?.where,
          orderBy: filter?.orderBy,
          cursor: filter?.cursor,
          include: filter?.include,
          skip: filter?.skip,
        }),
        this.prismaService.blog.count({
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
        throw new Error(error.message);
      }),
    );
  }

  public create(data: Prisma.BlogCreateInput) {
    return from(
      this.prismaService.blog.create({
        data,
        include: {
          author: { select: { fullName: true, id: true } },
          cover: true,
        },
      }),
    ).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public update(
    where: Prisma.BlogWhereUniqueInput,
    data: Prisma.BlogUpdateInput,
  ) {
    return from(this.prismaService.blog.update({ where, data })).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public delete(where: Prisma.BlogWhereUniqueInput) {
    return from(
      this.prismaService.blog.update({
        where,
        data: { deletedAt: new Date() },
      }),
    ).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public first(where: Prisma.BlogWhereUniqueInput, select?: Prisma.BlogSelect) {
    return from(this.prismaService.blog.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.BlogWhereUniqueInput,
    select?: Prisma.BlogSelect,
  ) {
    return from(this.prismaService.blog.findUnique({ where, select })).pipe(
      map((data) => {
        if (!data) throw new Error('error.not_found');
        return data;
      }),
      catchError(() => {
        throw new Error('error.not_found');
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.blog.findMany(filter)).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public count(filter: Omit<Filter, 'include'>): Observable<number> {
    return from(this.prismaService.blog.count(filter)).pipe(
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }

  public any(filter: Omit<Filter, 'include'>): Observable<boolean> {
    return this.count(filter).pipe(
      map((count) => count > 0),
      catchError((error) => {
        throw new Error(error.message);
      }),
    );
  }
}
