import { PartialType } from '@nestjs/mapped-types';
import { CreateSubDistrictsDto } from './create-subdistricts.dto';

export class UpdateSubDistrictsDto extends PartialType(CreateSubDistrictsDto) {}
