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
import { JournalTemplatesService } from '@app/journal-templates/services';
import { JournalTemplatesRepository } from '@app/journal-templates/repositories';
import { JournalTemplateDetailsRepository } from '@app/journal-templates/repositories/journal-template-details.repository';

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
    JournalTemplatesService,
    JournalTemplatesRepository,
    JournalTemplateDetailsRepository,
  ],
  exports: [WarehouseTransactionsRepository],
})
export class WarehouseTransactionsModule {}
