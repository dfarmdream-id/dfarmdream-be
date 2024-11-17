import { Module } from '@nestjs/common';
import { ChickensHttpController, ChickensMicroserviceController } from './controllers';
import { ChickensService } from './services';
import { ChickensRepository } from './repositories';

@Module({
  controllers: [ChickensHttpController, ChickensMicroserviceController],
  providers: [ChickensService, ChickensRepository],
})
export class ChickensModule {}
