import { Module } from '@nestjs/common';
import { GoodsController } from './controllers';
import { GoodsService } from './services';
import { GoodsRepository } from './repositories';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService, GoodsRepository],
})
export class GoodsModule {}
