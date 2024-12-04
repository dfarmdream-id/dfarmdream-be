import { Module } from '@nestjs/common';
import {
  GroupCoasHttpController,
  GroupCoasMicroserviceController,
} from './controllers';
import { GroupCoasService } from './services';
import { GroupCoasRepository } from './repositories';

@Module({
  controllers: [GroupCoasHttpController, GroupCoasMicroserviceController],
  providers: [GroupCoasService, GroupCoasRepository],
})
export class GroupCoasModule {}
