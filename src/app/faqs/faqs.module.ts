import { Module } from '@nestjs/common';
import {
  FaqsHttpController,
  FaqsMicroserviceController,
  FaqsPublicHttpController,
} from './controllers';
import { FaqsService } from './services';
import { FaqsRepository } from './repositories';

@Module({
  controllers: [
    FaqsHttpController,
    FaqsMicroserviceController,
    FaqsPublicHttpController,
  ],
  providers: [FaqsService, FaqsRepository],
})
export class FaqsModule {}
