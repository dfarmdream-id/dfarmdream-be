import { Module } from '@nestjs/common';
import {
  DocumentInvestmentsHttpController,
  DocumentInvestmentsMicroserviceController,
} from './controllers';
import { DocumentInvestmentsService } from './services';
import { DocumentInvestmentsRepository } from './repositories';
import { FilesModule } from '../files';

@Module({
  imports:[FilesModule],
  controllers: [
    DocumentInvestmentsHttpController,
    DocumentInvestmentsMicroserviceController,
  ],
  providers: [DocumentInvestmentsService, DocumentInvestmentsRepository],
})
export class DocumentInvestmentsModule {}
