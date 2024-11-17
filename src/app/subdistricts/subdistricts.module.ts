import { Module } from '@nestjs/common';
import { SubDistrictsHttpController, SubDistrictsMicroserviceController } from './controllers';
import { SubDistrictsService } from './services';
import { SubDistrictsRepository } from './repositories';

@Module({
  controllers: [SubDistrictsHttpController, SubDistrictsMicroserviceController],
  providers: [SubDistrictsService, SubDistrictsRepository],
})
export class SubDistrictsModule {}
