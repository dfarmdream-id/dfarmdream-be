import { Module } from '@nestjs/common';
import { ChickenCageRacksHttpController, ChickenCageRacksMicroserviceController } from './controllers';
import { ChickenCageRacksService } from './services';
import { ChickenCageRacksRepository } from './repositories';

@Module({
  controllers: [ChickenCageRacksHttpController, ChickenCageRacksMicroserviceController],
  providers: [ChickenCageRacksService, ChickenCageRacksRepository],
})
export class ChickenCageRacksModule {}
