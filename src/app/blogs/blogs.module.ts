import { Module } from '@nestjs/common';
import {
  BlogsHttpController,
  BlogsMicroserviceController,
  PublicBlogsHttpController,
} from './controllers';
import { BlogsService } from './services';
import { BlogsRepository } from './repositories';
import { FilesModule } from '../files';

@Module({
  imports: [FilesModule],
  controllers: [
    BlogsHttpController,
    BlogsMicroserviceController,
    PublicBlogsHttpController,
  ],
  providers: [BlogsService, BlogsRepository],
})
export class BlogsModule {}
