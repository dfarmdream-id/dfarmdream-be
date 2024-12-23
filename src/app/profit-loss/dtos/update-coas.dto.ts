import { PartialType } from '@nestjs/mapped-types';
import { CreateCoasDto } from './create-coas.dto';

export class UpdateCoasDto extends PartialType(CreateCoasDto) {}
