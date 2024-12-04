import { Module } from '@nestjs/common';
import {
  CashFlowCategoriesHttpController,
  CashFlowCategoriesMicroserviceController,
} from './controllers';
import { CashFlowCategoriesService } from './services';
import { CashFlowCategoriesRepository } from './repositories';

@Module({
  controllers: [
    CashFlowCategoriesHttpController,
    CashFlowCategoriesMicroserviceController,
  ],
  providers: [CashFlowCategoriesService, CashFlowCategoriesRepository],
})
export class CashFlowCategoriesModule {}
