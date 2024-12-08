import { Module } from '@nestjs/common';
import {
  JournalTemplatesHttpController,
  JournalTemplatesMicroserviceController,
} from './controllers';
import { JournalTemplatesService } from './services';
import { JournalTemplatesRepository } from './repositories';
import { JournalTemplateDetailsRepository } from '@app/journal-templates/repositories/journal-template-details.repository';

@Module({
  controllers: [
    JournalTemplatesHttpController,
    JournalTemplatesMicroserviceController,
  ],
  providers: [
    JournalTemplatesService,
    JournalTemplatesRepository,
    JournalTemplateDetailsRepository,
  ],
})
export class JournalTemplatesModule {}
