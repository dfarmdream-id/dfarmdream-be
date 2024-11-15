import { Module } from '@nestjs/common';
import {
  FilesHttpController,
  FilesMicroserviceController,
} from './controllers';
import { FilesService } from './services';
import { FilesRepository } from './repositories';

@Module({
  controllers: [FilesHttpController, FilesMicroserviceController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService],
})
export class FilesModule {}
