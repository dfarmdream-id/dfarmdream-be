import { Module } from '@nestjs/common';
import { JournalTypesHttpController, JournalTypesMicroserviceController } from './controllers';
import { JournalTypesService } from './services';
import { JournalTypesRepository } from './repositories';

@Module({
  controllers: [JournalTypesHttpController, JournalTypesMicroserviceController],
  providers: [JournalTypesService, JournalTypesRepository],
})
export class JournalTypesModule {}
