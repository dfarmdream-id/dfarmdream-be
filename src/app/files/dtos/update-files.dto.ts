import { PartialType } from '@nestjs/mapped-types';
import { CreateFilesDto } from './create-files.dto';

export class UpdateFilesDto extends PartialType(CreateFilesDto) {}
