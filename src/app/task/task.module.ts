import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AbsenModule } from '../absen';

@Module({
  imports:[AbsenModule],
  controllers: [TaskController],
  providers: [TaskService],

})
export class TaskModule {}
