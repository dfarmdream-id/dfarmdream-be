import { Module } from '@nestjs/common';
import {
  JournalTemplatesHttpController,
  JournalTemplatesMicroserviceController,
} from './controllers';
import { JournalTemplatesService } from './services';
import { JournalTemplatesRepository } from './repositories';

@Module({
  controllers: [
    JournalTemplatesHttpController,
    JournalTemplatesMicroserviceController,
  ],
  providers: [JournalTemplatesService, JournalTemplatesRepository],
})
export class JournalTemplatesModule {}
