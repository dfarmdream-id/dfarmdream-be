import { Module } from '@nestjs/common';
import {
  ChickenCagesHttpController,
  ChickenCagesMicroserviceController,
} from './controllers';
import { ChickenCagesService } from './services';
import { CagesRepository } from './repositories';

@Module({
  controllers: [ChickenCagesHttpController, ChickenCagesMicroserviceController],
  providers: [ChickenCagesService, CagesRepository],
  exports: [CagesRepository],
})
export class ChickenCagesModule {}
