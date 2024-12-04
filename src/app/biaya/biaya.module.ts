import { Module } from '@nestjs/common';
import { BiayaController } from './controllers';
import { BiayaService } from './services';
import { BiayaRepository } from './repositories';

@Module({
  controllers: [BiayaController],
  providers: [BiayaService, BiayaRepository],
})
export class BiayaModule {}
