import { Controller, Get, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthModule } from './auth';
import { BlogsModule } from './blogs';
import { FilesModule } from './files';
import { FaqsModule } from './faqs';

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
  imports: [UsersModule, AuthModule, BlogsModule, FilesModule, FaqsModule],
  controllers: [AppController],
  exports: [FilesModule],
})
export class AppModule {}
