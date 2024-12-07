import { Module } from '@nestjs/common';
import { CoasHttpController, CoasMicroserviceController } from './controllers';
import { CoasService } from './services';
import { CoasRepository } from './repositories';

@Module({
  controllers: [CoasHttpController, CoasMicroserviceController],
  providers: [CoasService, CoasRepository],
})
export class CoasModule {}
