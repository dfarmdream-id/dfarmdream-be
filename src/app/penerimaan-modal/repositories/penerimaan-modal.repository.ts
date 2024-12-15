import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { PaginatedEntity } from 'src/common/entities/paginated.entity';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { CreatePenerimaanModal } from '../dtos/create-penerimaan-modal.dto';

export type Filter = {
  where?: Prisma.PenerimaanModalWhereInput;
  orderBy?: Prisma.PenerimaanModalOrderByWithRelationInput;
  cursor?: Prisma.PenerimaanModalWhereUniqueInput;
  take?: number;
  skip?: number;
  include?: Prisma.PenerimaanModalInclude;
};

@Injectable()
export class PenerimaanModalRepository {
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
          { tanggal: { contains: q, mode: 'insensitive' } },
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
        this.prismaService.penerimaanModal.findMany({
          skip: (+page - 1) * +limit,
          take: +limit,
          where: where,
          orderBy: filter?.orderBy,
          include: {
            cage: true,
            site: true,
            investor: true,
          },
          cursor: filter?.cursor,
        }),
        this.prismaService.penerimaanModal.count({
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

  public create(data: CreatePenerimaanModal) {
    // Destrukturisasi untuk menghilangkan journalTypeId dari data
    const { journalTypeId, ...filteredData } = data;
    journalTypeId;

    return from(
      this.prismaService.penerimaanModal.create({
        data: filteredData, // Gunakan data tanpa journalTypeId
      }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public update(
    where: Prisma.PenerimaanModalWhereUniqueInput,
    data: Prisma.PenerimaanModalUpdateInput,
  ) {
    return from(
      this.prismaService.penerimaanModal.update({ where, data }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public delete(where: Prisma.PenerimaanModalWhereUniqueInput) {
    return from(
      this.prismaService.penerimaanModal.update({
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
    where: Prisma.PenerimaanModalWhereUniqueInput,
    select?: Prisma.PenerimaanModalSelect,
  ) {
    return from(
      this.prismaService.penerimaanModal.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.PenerimaanModalWhereUniqueInput,
    select?: Prisma.PenerimaanModalSelect,
  ) {
    return from(
      this.prismaService.penerimaanModal.findUnique({ where, select }),
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public find(filter: Filter) {
    return from(this.prismaService.penerimaanModal.findMany(filter)).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
}
