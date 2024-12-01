import { Module } from '@nestjs/common';
import { JournalTemplateDetailsHttpController, JournalTemplateDetailsMicroserviceController } from './controllers';
import { JournalTemplateDetailsService } from './services';
import { JournalTemplateDetailsRepository } from './repositories';

@Module({
  controllers: [JournalTemplateDetailsHttpController, JournalTemplateDetailsMicroserviceController],
  providers: [JournalTemplateDetailsService, JournalTemplateDetailsRepository],
})
export class JournalTemplateDetailsModule {}
