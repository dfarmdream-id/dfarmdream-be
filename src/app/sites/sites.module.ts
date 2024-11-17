import { Module } from '@nestjs/common';
import {
  SitesHttpController,
  SitesMicroserviceController,
} from './controllers';
import { SitesService } from './services';
import { SitesRepository } from './repositories';

@Module({
  controllers: [SitesHttpController, SitesMicroserviceController],
  providers: [SitesService, SitesRepository],
  exports: [SitesRepository],
})
export class SitesModule {}
