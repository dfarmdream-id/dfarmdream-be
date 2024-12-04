import { Module } from '@nestjs/common';
import {
  ProvincesHttpController,
  ProvincesMicroserviceController,
} from './controllers';
import { ProvincesService } from './services';
import { ProvincesRepository } from './repositories';

@Module({
  controllers: [ProvincesHttpController, ProvincesMicroserviceController],
  providers: [ProvincesService, ProvincesRepository],
})
export class ProvincesModule {}
