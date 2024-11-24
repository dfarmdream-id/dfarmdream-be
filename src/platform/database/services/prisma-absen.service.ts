import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../prisma/generated/absen_client';

@Injectable()
export class PrismaAbsenService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
