import { Module } from '@nestjs/common';
import { SensorService } from './services';
import { SensorDeviceRepository, SensorRepository } from './repositories';
import { SensorHttpController } from './controllers';

@Module({
  controllers: [SensorHttpController],
  providers: [SensorService, SensorRepository, SensorDeviceRepository],
  exports: [SensorRepository, SensorDeviceRepository],
})
export class SensorModule {}
