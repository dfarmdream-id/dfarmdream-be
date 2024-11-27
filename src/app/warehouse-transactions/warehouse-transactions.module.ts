import { Module } from '@nestjs/common';
import {
  WarehouseTransactionsHttpController,
  WarehouseTransactionsMicroserviceController,
} from './controllers';
import { WarehouseTransactionsService } from './services';
import { WarehouseTransactionsRepository } from './repositories';
import { PricesModule } from '../prices';

@Module({
  imports: [PricesModule],
  controllers: [
    WarehouseTransactionsHttpController,
    WarehouseTransactionsMicroserviceController,
  ],
  providers: [WarehouseTransactionsService, WarehouseTransactionsRepository],
  exports: [WarehouseTransactionsRepository],
})
export class WarehouseTransactionsModule {}
