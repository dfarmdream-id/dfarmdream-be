import { Module } from '@nestjs/common';
import {
  JournalHttpController,
  JournalHeadersMicroserviceController,
} from './controllers';
import { JournalService } from './services';
import { JournalHeaderRepository } from './repositories';
import {JournalDetailRepository} from "@app/journal/repositories/journal-detail.repository";

@Module({
  controllers: [JournalHttpController, JournalHeadersMicroserviceController],
  providers: [JournalService, JournalHeaderRepository, JournalDetailRepository],
})
export class JournalModule {}
