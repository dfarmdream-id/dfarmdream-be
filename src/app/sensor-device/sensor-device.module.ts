import { Module } from '@nestjs/common';
import { SensorDeviceHttpController } from './controllers';
import { SensorDeviceRepository } from './repositories';
import { SensorDeviceService } from './services';

@Module({
  controllers: [SensorDeviceHttpController],
  providers: [SensorDeviceRepository, SensorDeviceService],
  exports: [SensorDeviceService],
})
export class SensorDeviceModule {}
