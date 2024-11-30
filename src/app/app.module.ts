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
import { DashboardsModule } from './dashboards';
import { CashFlowCategoriesModule } from './cash-flow-categories';
import { CashFlowsModule } from './cash-flows';
import { PricesModule } from './prices';
import { TransactionsModule } from './transactions';
import { WarehouseTransactionsModule } from './warehouse-transactions';
import { SensorModule } from './sensor/sensor.module';
import { CctvCameraModule } from './cctv-camera';
import { AbsenModule } from './absen';
import { TaskModule } from './task/task.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { TelegramModule } from './telegram';

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
    DashboardsModule,
    CashFlowCategoriesModule,
    CashFlowsModule,
    PricesModule,
    TransactionsModule,
    WarehouseTransactionsModule,
    CctvCameraModule,
    SensorModule,
    AbsenModule,
    TaskModule,
    TelegramModule,
    TelegrafModule.forRootAsync({
      useFactory: async () => {
        return {
          token: process.env.TELEGRAM_TOKEN??'',
          middlewares: [session()],
          include: [TelegramModule],
        };
      },
    }),
  ],
  controllers: [AppController],
  exports: [FilesModule],
})
export class AppModule {}
