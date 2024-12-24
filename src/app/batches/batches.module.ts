import { Module } from '@nestjs/common';
import { BatchesHttpController, BatchesMicroserviceController } from './controllers';
import { BatchesService } from './services';
import { BatchesRepository } from './repositories';

@Module({
  controllers: [BatchesHttpController, BatchesMicroserviceController],
  providers: [BatchesService, BatchesRepository],
})
export class BatchesModule {}
