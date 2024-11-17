import { Module } from '@nestjs/common';
import { DashboardsHttpController } from './controllers';
import { DashboardsService } from './services';
import { InvestorsModule } from '../investors';
import { ChickenCagesModule } from '../chicken-cages';
import { UsersModule } from '../users';
import { ChickensModule } from '../chickens';

@Module({
  imports: [InvestorsModule, ChickenCagesModule, UsersModule, ChickensModule],
  controllers: [DashboardsHttpController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
