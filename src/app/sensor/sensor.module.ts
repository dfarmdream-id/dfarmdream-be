import { Module } from '@nestjs/common';
import { SensorService } from './services';
import {  SensorRepository } from './repositories';
import { SensorHttpController } from './controllers';
import { SensorDeviceModule } from '../sensor-device';

@Module({
  imports:[SensorDeviceModule],
  controllers: [SensorHttpController],
  providers: [SensorService, SensorRepository],
  exports: [SensorRepository],
})
export class SensorModule {}
