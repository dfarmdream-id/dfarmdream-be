import { Module } from '@nestjs/common';
import { AbsenService } from './services';
import { AbsenHttpController } from './controllers';
import { PrismaAbsenService } from '@src/platform/database/services/prisma-absen.service';

@Module({
  controllers: [AbsenHttpController],
  providers: [AbsenService, PrismaAbsenService],
  exports: [AbsenService, PrismaAbsenService],
})
export class AbsenModule {}
