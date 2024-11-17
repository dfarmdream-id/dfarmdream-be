import { PartialType } from '@nestjs/mapped-types';
import { CreateDistrictsDto } from './create-districts.dto';

export class UpdateDistrictsDto extends PartialType(CreateDistrictsDto) {}
