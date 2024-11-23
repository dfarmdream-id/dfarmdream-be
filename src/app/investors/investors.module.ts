import { Module } from '@nestjs/common';
import { InvestorsHttpController } from './controllers';
import { InvestorsService } from './services';
import { InvestorsRepository } from './repositories';

@Module({
  controllers: [InvestorsHttpController],
  providers: [InvestorsService, InvestorsRepository],
  exports: [InvestorsRepository, InvestorsService],
})
export class InvestorsModule {}
