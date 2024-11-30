import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { TelegramService } from './telegram.service';
import { RegisterWizard } from './scenes';
import { TelegramUpdate } from './telegram.update';

@Module({
  imports: [UsersModule],
  providers: [TelegramService, TelegramUpdate, RegisterWizard],
})
export class TelegramModule {}
