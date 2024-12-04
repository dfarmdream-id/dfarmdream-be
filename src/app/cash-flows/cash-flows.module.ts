import { Module } from '@nestjs/common';
import {
  CashFlowsHttpController,
  CashFlowsMicroserviceController,
} from './controllers';
import { CashFlowsService } from './services';
import { CashFlowsRepository } from './repositories';

@Module({
  controllers: [CashFlowsHttpController, CashFlowsMicroserviceController],
  providers: [CashFlowsService, CashFlowsRepository],
})
export class CashFlowsModule {}
