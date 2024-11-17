import { Module } from '@nestjs/common';
import { ChickenCagesHttpController, ChickenCagesMicroserviceController } from './controllers';
import { ChickenCagesService } from './services';
import { ChickenCagesRepository } from './repositories';

@Module({
  controllers: [ChickenCagesHttpController, ChickenCagesMicroserviceController],
  providers: [ChickenCagesService, ChickenCagesRepository],
})
export class ChickenCagesModule {}
