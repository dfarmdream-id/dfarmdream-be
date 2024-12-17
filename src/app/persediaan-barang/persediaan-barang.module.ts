import { Module } from '@nestjs/common';
import { PersediaanBarangController } from './controllers';
import { PersediaanBarangService } from './services';
import { PersediaanBarangRepository } from './repositories';
import { JournalService } from '@app/journal/services';
import { JournalHeaderRepository } from '@app/journal/repositories';
import { JournalDetailRepository } from '@app/journal/repositories/journal-detail.repository';

@Module({
  controllers: [PersediaanBarangController],
  providers: [
    PersediaanBarangService,
    PersediaanBarangRepository,
    JournalService,
    JournalHeaderRepository,
    JournalDetailRepository,
  ],
})
export class PersediaanBarangModule {}
