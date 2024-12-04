import { Module } from '@nestjs/common';
import {
  DistrictsHttpController,
  DistrictsMicroserviceController,
} from './controllers';
import { DistrictsService } from './services';
import { DistrictsRepository } from './repositories';

@Module({
  controllers: [DistrictsHttpController, DistrictsMicroserviceController],
  providers: [DistrictsService, DistrictsRepository],
})
export class DistrictsModule {}
