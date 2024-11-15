import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogsDto } from './create-blogs.dto';

export class UpdateBlogsDto extends PartialType(CreateBlogsDto) {}
