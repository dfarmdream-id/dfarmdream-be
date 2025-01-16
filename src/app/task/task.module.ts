import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AbsenModule } from '../absen';
import { SensorModule } from '../sensor';
import { BiayaModule } from '@app/biaya';

@Module({
  imports: [AbsenModule, SensorModule, BiayaModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
