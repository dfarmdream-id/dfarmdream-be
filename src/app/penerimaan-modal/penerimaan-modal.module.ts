import { Module } from '@nestjs/common';
import { PenerimaanModalService } from './services/penerimaan-modal.service';
import { PenerimaanModalController } from './controllers/penerimaan-modal.controller';
import { PenerimaanModalRepository } from './repositories/penerimaan-modal.repository';
import { JournalService } from '@app/journal/services';
import { JournalHeaderRepository } from '@app/journal/repositories';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';
import { JournalTemplatesService } from '@app/journal-templates/services';
import { JournalTemplatesRepository } from '@app/journal-templates/repositories';
import { JournalTemplateDetailsRepository } from '@app/journal-templates/repositories/journal-template-details.repository';

@Module({
  controllers: [PenerimaanModalController],
  providers: [
    PenerimaanModalService,
    PenerimaanModalRepository,
    JournalService,
    JournalHeaderRepository,
    JournalDetailRepository,
    JournalTemplatesService,
    JournalTemplatesRepository,
    JournalTemplateDetailsRepository,
  ],
})
export class PenerimaanModalModule {}
