import { Module } from '@nestjs/common';
import {  PersediaanBarangController } from './controllers';
import { PersediaanBarangService } from './services';
import { PersediaanBarangRepository } from './repositories';


@Module({
  controllers: [PersediaanBarangController],
  providers: [PersediaanBarangService, PersediaanBarangRepository],
})
export class PersediaanBarangModule {}
