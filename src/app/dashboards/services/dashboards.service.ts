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

  public summary(siteId?: string) {
    return of({}).pipe(
      switchMap(async () => {
        const user = await this.userRepository.count({
          where: { deletedAt: null, sites: { some: { id: siteId } } },
        });
        const cage = await firstValueFrom(
          this.chickenCageRepository.count({
            where: { deletedAt: null, siteId },
          }),
        );
        const investor = await firstValueFrom(
          this.investorRepository.count({
            where: {
              deletedAt: null,
            },
          }),
        );
        const weightTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('weight', {
              type: 'IN',
              deletedAt: null,
            })
            .pipe(map((qty) => qty._sum.weight)),
        );

        const qtyTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('qty', {
              type: 'IN',
              deletedAt: null,
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

  public chart(siteId: string) {
    const alive = this.chickendRepository.count({
      where: {
        status: 'ALIVE',
        deletedAt: null,
        rack: {
          cage: {
            siteId: siteId,
          },
        },
      },
    });
    const dead = this.chickendRepository.count({
      where: {
        status: 'DEAD',
        deletedAt: null,
        rack: {
          cage: {
            siteId: siteId,
          },
        },
      },
    });

    return forkJoin({ alive, dead });
  }
}
