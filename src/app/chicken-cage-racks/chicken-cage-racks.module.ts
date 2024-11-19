import { Module } from '@nestjs/common';
import {
  ChickenCageRacksHttpController,
  ChickenCageRacksMicroserviceController,
} from './controllers';
import { ChickenCageRacksService } from './services';
import { CageRacksRepository } from './repositories';

@Module({
  controllers: [
    ChickenCageRacksHttpController,
    ChickenCageRacksMicroserviceController,
  ],
  providers: [ChickenCageRacksService, CageRacksRepository],
})
export class ChickenCageRacksModule {}
