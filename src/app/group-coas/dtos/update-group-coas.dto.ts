import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupCoasDto } from './create-group-coas.dto';

export class UpdateGroupCoasDto extends PartialType(CreateGroupCoasDto) {}
