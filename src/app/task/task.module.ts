import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AbsenModule } from '../absen';
import { SensorModule } from '../sensor';

@Module({
  imports: [AbsenModule, SensorModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
