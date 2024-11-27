import { Module } from '@nestjs/common';
import { DocumentInvestmentsHttpController, DocumentInvestmentsMicroserviceController } from './controllers';
import { DocumentInvestmentsService } from './services';
import { DocumentInvestmentsRepository } from './repositories';

@Module({
  controllers: [DocumentInvestmentsHttpController, DocumentInvestmentsMicroserviceController],
  providers: [DocumentInvestmentsService, DocumentInvestmentsRepository],
})
export class DocumentInvestmentsModule {}
