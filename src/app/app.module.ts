import { Controller, Get, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthModule } from './auth';
import { FilesModule } from './files';
// import { BlogsModule } from './blogs';
// import { FaqsModule } from './faqs';
import { PermissionsModule } from './permissions';
import { RolesModule } from './roles';
import { SitesModule } from './sites';
import { PositionsModule } from './positions';

@ApiTags('App Spec')
@Controller()
class AppController {
  constructor() {}

  @Get()
  getHello() {
    return new ResponseEntity({
      data: {
        appVersion: 1,
        swaggerUrl: '/api',
      },
    });
  }
}

@Module({
  imports: [
    UsersModule,
    AuthModule,
    // BlogsModule,
    FilesModule,
    // FaqsModule,
    PermissionsModule,
    RolesModule,
    SitesModule,
    PositionsModule,
  ],
  controllers: [AppController],
  exports: [FilesModule],
})
export class AppModule {}
