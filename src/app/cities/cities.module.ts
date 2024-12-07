import { Module } from '@nestjs/common';
import {
  CitiesHttpController,
  CitiesMicroserviceController,
} from './controllers';
import { CitiesService } from './services';
import { CitiesRepository } from './repositories';

@Module({
  controllers: [CitiesHttpController, CitiesMicroserviceController],
  providers: [CitiesService, CitiesRepository],
})
export class CitiesModule {}
