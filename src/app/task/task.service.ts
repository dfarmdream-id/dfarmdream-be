import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AbsenService } from '../absen/services';
import { SensorService } from '../sensor/services';

@Injectable()
export class TaskService {
  constructor(private absenService: AbsenService, private sensorService:SensorService) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron('*/5 * * * *')
  handleCron() {
    this.logger.debug('Running 5 minutes cron');
    this.absenService.syncDataAbsen();
    this.absenService.syncAttendanceLog();

  }
  
  @Cron('00 01 * * *')
  handleCron2() {
    this.logger.debug('Running Generate absen');
    this.absenService.generateDataAbsen();
  }
  
  @Cron('*/10 * * * *')
  handleSyncAttendanceLog() {
    this.logger.debug('Running 10 minutes cron');
    this.sensorService.syncTenMinutesData();
  }
}
