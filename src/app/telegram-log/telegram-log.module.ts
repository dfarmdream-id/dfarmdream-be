import { Module } from '@nestjs/common';
import { TelegramLogHttpController } from './controllers';
import { TelegramLogService } from './services/telegram-log.service';

@Module({
  controllers: [TelegramLogHttpController],
  providers: [TelegramLogService],
  exports: [TelegramLogService],
})
export class TelegramLogModule {}
