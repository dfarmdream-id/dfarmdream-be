import { Module } from '@nestjs/common';
import { KategoriBiayaController } from './controllers';
import { KategoriBiayaService } from './services';
import { KategoriBiayaRepository } from './repositories';

@Module({
  controllers: [KategoriBiayaController],
  providers: [KategoriBiayaService, KategoriBiayaRepository],
})
export class KategoriBiayaModule {}
