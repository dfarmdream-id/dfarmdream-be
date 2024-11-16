import { Module } from '@nestjs/common';
import {
  PermissionsHttpController,
  PermissionsMicroserviceController,
} from './controllers';
import { PermissionsService } from './services';
import { PermissionsRepository } from './repositories';

@Module({
  controllers: [PermissionsHttpController, PermissionsMicroserviceController],
  providers: [PermissionsService, PermissionsRepository],
})
export class PermissionsModule {}
