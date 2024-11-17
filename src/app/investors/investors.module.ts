import { Module } from '@nestjs/common';
import { InvestorsHttpController, InvestorsMicroserviceController } from './controllers';
import { InvestorsService } from './services';
import { InvestorsRepository } from './repositories';

@Module({
  controllers: [InvestorsHttpController, InvestorsMicroserviceController],
  providers: [InvestorsService, InvestorsRepository],
})
export class InvestorsModule {}
