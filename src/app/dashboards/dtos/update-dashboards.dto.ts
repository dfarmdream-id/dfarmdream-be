import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardsDto } from './create-dashboards.dto';

export class UpdateDashboardsDto extends PartialType(CreateDashboardsDto) {}
