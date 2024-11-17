import { PartialType } from '@nestjs/mapped-types';
import { CreateProvincesDto } from './create-provinces.dto';

export class UpdateProvincesDto extends PartialType(CreateProvincesDto) {}
