import { Module } from '@nestjs/common';
import {
  ChickenDiseasesHttpController,
  ChickenDiseasesMicroserviceController,
} from './controllers';
import { ChickenDiseasesService } from './services';
import { ChickenDiseasesRepository } from './repositories';

@Module({
  controllers: [
    ChickenDiseasesHttpController,
    ChickenDiseasesMicroserviceController,
  ],
  providers: [ChickenDiseasesService, ChickenDiseasesRepository],
})
export class ChickenDiseasesModule {}
