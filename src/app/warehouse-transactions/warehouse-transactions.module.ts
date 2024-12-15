import { Module } from '@nestjs/common';
import {
  WarehouseTransactionsHttpController,
  WarehouseTransactionsPublicHttpController,
} from './controllers';
import { WarehouseTransactionsService } from './services';
import { WarehouseTransactionsRepository } from './repositories';
import { PricesModule } from '../prices';
import { JournalService } from '@app/journal/services';
import { JournalHeaderRepository } from '@app/journal/repositories';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';

@Module({
  imports: [PricesModule],
  controllers: [
    WarehouseTransactionsHttpController,
    WarehouseTransactionsPublicHttpController,
  ],
  providers: [
    WarehouseTransactionsService,
    WarehouseTransactionsRepository,
    JournalService,
    JournalHeaderRepository,
    JournalDetailRepository,
  ],
  exports: [WarehouseTransactionsRepository],
})
export class WarehouseTransactionsModule {}
