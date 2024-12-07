import { Module } from '@nestjs/common';
import { SensorService } from './services';
import { SensorDeviceRepository, SensorRepository } from './repositories';
import { SensorHttpController } from './controllers';
import { TelegramModule } from '../telegram';

@Module({
  imports: [TelegramModule],
  controllers: [SensorHttpController],
  providers: [SensorService, SensorRepository, SensorDeviceRepository],
  exports: [SensorRepository, SensorDeviceRepository],
})
export class SensorModule {}
