import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/platform/database/services/prisma.service';

export type Filter = {
  where?: Prisma.JournalDetailWhereInput;
  cursor?: Prisma.CoaWhereUniqueInput;
};

@Injectable()
export class ProfitLossesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public first(where: Prisma.CoaWhereUniqueInput, select?: Prisma.CoaSelect) {
    return from(this.prismaService.coa.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  public firstOrThrow(
    where: Prisma.JournalDetailWhereUniqueInput,
    select?: Prisma.JournalDetailSelect,
  ) {
    return from(this.prismaService.journalDetail.findUnique({ where, select })).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  // public find(filter: Filter) {
  //   return from(this.prismaService.coa.findMany(filter)).pipe(
  //     catchError((error) => {
  //       throw error;
  //     }),
  //   );
  // }

  // public count(filter: Omit<Filter, 'include'>) {
  //   return from(this.prismaService.coa.count(filter)).pipe(
  //     catchError((error) => {
  //       throw error;
  //     }),
  //   );
  // }

  // public any(filter: Omit<Filter, 'include'>) {
  //   return this.count(filter).pipe(
  //     map((count) => count > 0),
  //     catchError((error) => {
  //       throw error;
  //     }),
  //   );
  // }
}
