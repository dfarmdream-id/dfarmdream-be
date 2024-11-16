import { PartialType } from '@nestjs/mapped-types';
import { CreateSitesDto } from './create-sites.dto';

export class UpdateSitesDto extends PartialType(CreateSitesDto) {}
