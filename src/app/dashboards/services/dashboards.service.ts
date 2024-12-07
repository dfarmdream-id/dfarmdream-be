import { Injectable } from '@nestjs/common';
import { CagesRepository } from '@src/app/chicken-cages/repositories';
import { ChickensRepository } from '@src/app/chickens/repositories';
import { InvestorsRepository } from '@src/app/investors/repositories';
import { UsersRepository } from '@src/app/users/repositories';
import { WarehouseTransactionsRepository } from '@src/app/warehouse-transactions/repositories';
import { firstValueFrom, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable()
export class DashboardsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly chickenCageRepository: CagesRepository,
    private readonly investorRepository: InvestorsRepository,
    private readonly chickendRepository: ChickensRepository,
    private readonly warehouseTransactionRepository: WarehouseTransactionsRepository,
  ) {}

  public summary(
    siteId: string,
    {
      date,
      cageId,
    }: {
      date: string;
      cageId: string;
    },
  ) {
    return of({}).pipe(
      switchMap(async () => {
        const user = await this.userRepository.count({
          where: {
            deletedAt: null,
            sites: { some: { siteId: siteId } },
          },
        });

        const cage = await firstValueFrom(
          this.chickenCageRepository.count({
            where: {
              deletedAt: null,
              siteId,
              ...(cageId && { id: cageId }), // Filter by cageId if provided
            },
          }),
        );

        const investor = await firstValueFrom(
          this.investorRepository.count({
            where: {
              deletedAt: null,
              documentInvestment: {
                some: {
                  siteId,
                },
              },
            },
          }),
        );

        const weightTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('weight', {
              type: 'IN',
              deletedAt: null,
              siteId,
              ...(cageId && { cageId }), // Filter by cageId if provided
              ...(date && {
                createdAt: {
                  gte: new Date(`${date}T00:00:00Z`), // Start of the day
                  lt: new Date(`${date}T23:59:59Z`), // End of the day
                },
              }),
            })
            .pipe(map((qty) => qty._sum.weight)),
        );

        const qtyTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('qty', {
              type: 'IN',
              deletedAt: null,
              siteId,
              ...(cageId && { cageId }), // Filter by cageId if provided
              ...(date && {
                createdAt: {
                  gte: new Date(`${date}T00:00:00Z`), // Start of the day
                  lt: new Date(`${date}T23:59:59Z`), // End of the day
                },
              }),
            })
            .pipe(map((qty) => qty._sum.qty)),
        );

        return {
          user,
          cage,
          investor,
          weightTotal,
          qtyTotal,
        };
      }),
    );
  }

  public chart(
    siteId: string,
    {
      date,
      cageId,
    }: {
      date: string;
      cageId: string;
    },
  ) {
    const alive = this.chickendRepository.count({
      where: {
        status: 'ALIVE',
        deletedAt: null,
        rack: {
          cage: {
            siteId: siteId,
            ...(cageId && { id: cageId }), // Filter by cageId jika tersedia
          },
        },
        ...(date && {
          createdAt: {
            gte: new Date(`${date}T00:00:00Z`), // Start of the day
            lt: new Date(`${date}T23:59:59Z`), // End of the day
          },
        }),
      },
    });

    const dead = this.chickendRepository.count({
      where: {
        status: 'DEAD',
        deletedAt: null,
        rack: {
          cage: {
            siteId: siteId,
            ...(cageId && { id: cageId }), // Filter by cageId jika tersedia
          },
        },
        ...(date && {
          createdAt: {
            gte: new Date(`${date}T00:00:00Z`), // Start of the day
            lt: new Date(`${date}T23:59:59Z`), // End of the day
          },
        }),
      },
    });

    return forkJoin({ alive, dead });
  }
}
