import { Module } from '@nestjs/common';
import { JournalHeadersHttpController, JournalHeadersMicroserviceController } from './controllers';
import { JournalHeadersService } from './services';
import { JournalHeadersRepository } from './repositories';

@Module({
  controllers: [JournalHeadersHttpController, JournalHeadersMicroserviceController],
  providers: [JournalHeadersService, JournalHeadersRepository],
})
export class JournalHeadersModule {}
