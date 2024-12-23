import { Module } from '@nestjs/common';
import { ProfitLossesHttpController } from './controllers';
import { ProfitLossesService } from './services';
import { ProfitLossesRepository } from './repositories';

@Module({
  controllers: [ProfitLossesHttpController],
  providers: [ProfitLossesService, ProfitLossesRepository],
})
export class ProfitLossesModule {}
