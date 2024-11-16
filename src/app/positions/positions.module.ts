import { Module } from '@nestjs/common';
import { PositionsHttpController, PositionsMicroserviceController } from './controllers';
import { PositionsService } from './services';
import { PositionsRepository } from './repositories';

@Module({
  controllers: [PositionsHttpController, PositionsMicroserviceController],
  providers: [PositionsService, PositionsRepository],
})
export class PositionsModule {}
