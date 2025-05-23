import { Global, Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { DatabaseModule } from './platform/database/database.module';
import { I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { StorageModule } from './platform/storage/storage.module';

@Global()
@Module({
  imports: [
    AppModule,
    DatabaseModule,
    StorageModule,
    I18nModule.forRoot({
      fallbackLanguage: 'id',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [DatabaseModule, StorageModule],
})
export class MainModule {}
