import { Module } from '@nestjs/common';
import { PenerimaanModalService } from './services/penerimaan-modal.service';
import { PenerimaanModalController } from './controllers/penerimaan-modal.controller';
import { PenerimaanModalRepository } from './repositories/penerimaan-modal.repository';

@Module({
  controllers: [PenerimaanModalController],
  providers: [PenerimaanModalService, PenerimaanModalRepository],
})
export class PenerimaanModalModule {}
