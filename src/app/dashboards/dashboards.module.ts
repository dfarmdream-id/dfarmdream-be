import { Module } from '@nestjs/common';
import { DashboardsHttpController } from './controllers';
import { DashboardsService } from './services';
import { InvestorsModule } from '../investors';
import { ChickenCagesModule } from '../chicken-cages';
import { UsersModule } from '../users';
import { ChickensModule } from '../chickens';
import { WarehouseTransactionsModule } from '../warehouse-transactions';

@Module({
  imports: [
    InvestorsModule,
    ChickenCagesModule,
    UsersModule,
    ChickensModule,
    WarehouseTransactionsModule,
  ],
  controllers: [DashboardsHttpController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
