import { Module } from '@nestjs/common';
import { SensorService } from './services';
import { SensorRepository } from './repositories';
import { SensorHttpController } from './controllers';

@Module({
  controllers: [SensorHttpController],
  providers: [SensorService, SensorRepository],
})
export class SensorModule {}
