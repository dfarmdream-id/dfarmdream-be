import { PartialType } from '@nestjs/mapped-types';
import { CreateChickensDto } from './create-chickens.dto';

export class UpdateChickensDto extends PartialType(CreateChickensDto) {}
