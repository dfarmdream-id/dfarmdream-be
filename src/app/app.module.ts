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
import { ChickenCageRacksModule } from './chicken-cage-racks';
import { ChickenCagesModule } from './chicken-cages';
import { ChickensModule } from './chickens';
import { CitiesModule } from './cities';
import { DistrictsModule } from './districts';
import { DocumentInvestmentsModule } from './document-investments';
import { InvestorsModule } from './investors';
import { ProvincesModule } from './provinces';
import { SubDistrictsModule } from './subdistricts';

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
    ChickenCageRacksModule,
    ChickenCagesModule,
    ChickensModule,
    CitiesModule,
    DistrictsModule,
    DocumentInvestmentsModule,
    InvestorsModule,
    ProvincesModule,
    SubDistrictsModule,
  ],
  controllers: [AppController],
  exports: [FilesModule],
})
export class AppModule {}
