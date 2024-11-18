import { Module } from '@nestjs/common';
import { PricesHttpController, PricesMicroserviceController } from './controllers';
import { PricesService } from './services';
import { PricesRepository } from './repositories';

@Module({
  controllers: [PricesHttpController, PricesMicroserviceController],
  providers: [PricesService, PricesRepository],
})
export class PricesModule {}
