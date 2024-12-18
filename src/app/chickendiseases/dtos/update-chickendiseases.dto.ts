import { PartialType } from '@nestjs/mapped-types';
import { CreateChickenDiseasesDto } from './create-chickendiseases.dto';

export class UpdateChickenDiseasesDto extends PartialType(
  CreateChickenDiseasesDto,
) {}
