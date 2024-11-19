import { Module } from '@nestjs/common';
import {
  TransactionsHttpController,
  TransactionsMicroserviceController,
} from './controllers';
import { TransactionsService } from './services';
import { TransactionsRepository } from './repositories';

@Module({
  controllers: [TransactionsHttpController, TransactionsMicroserviceController],
  providers: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule {}
