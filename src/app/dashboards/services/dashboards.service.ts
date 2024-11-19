import { Injectable } from '@nestjs/common';
import { CagesRepository } from '@src/app/chicken-cages/repositories';
import { ChickensRepository } from '@src/app/chickens/repositories';
import { InvestorsRepository } from '@src/app/investors/repositories';
import { UsersRepository } from '@src/app/users/repositories';
import { firstValueFrom, forkJoin, of, switchMap } from 'rxjs';

@Injectable()
export class DashboardsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly chickenCageRepository: CagesRepository,
    private readonly investorRepository: InvestorsRepository,
    private readonly chickendRepository: ChickensRepository,
  ) {}

  public summary() {
    return of({}).pipe(
      switchMap(async () => {
        const user = await this.userRepository.count({
          where: { deletedAt: null },
        });
        const cage = await firstValueFrom(
          this.chickenCageRepository.count({
            where: { deletedAt: null },
          }),
        );
        const investor = await firstValueFrom(
          this.investorRepository.count({
            where: {
              deletedAt: null,
            },
          }),
        );

        return {
          user,
          cage,
          investor,
        };
      }),
    );
  }

  public chart() {
    const alive = this.chickendRepository.count({
      where: {
        status: 'ALIVE',
      },
    });
    const dead = this.chickendRepository.count({
      where: {
        status: 'DEAD',
      },
    });

    return forkJoin({ alive, dead });
  }
}
