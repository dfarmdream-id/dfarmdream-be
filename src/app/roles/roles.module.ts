import { Module } from '@nestjs/common';
import {
  RolesHttpController,
  RolesMicroserviceController,
} from './controllers';
import { RolesService } from './services';
import { RolesRepository } from './repositories';

@Module({
  controllers: [RolesHttpController, RolesMicroserviceController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
