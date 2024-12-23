import { Module } from '@nestjs/common';
import { BiayaController } from './controllers';
import { BiayaService } from './services';
import { BiayaRepository } from './repositories';
import { JournalService } from '@app/journal/services';
import { JournalHeaderRepository } from '@app/journal/repositories';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';
import { JournalTemplatesService } from '@app/journal-templates/services';
import { JournalTemplatesRepository } from '@app/journal-templates/repositories';
import { JournalTemplateDetailsRepository } from '@app/journal-templates/repositories/journal-template-details.repository';

@Module({
  controllers: [BiayaController],
  providers: [
    BiayaService,
    BiayaRepository,
    JournalService,
    JournalHeaderRepository,
    JournalDetailRepository,
    JournalTemplatesService,
    JournalTemplatesRepository,
    JournalTemplateDetailsRepository,
  ],
})
export class BiayaModule {}
