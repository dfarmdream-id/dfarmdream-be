import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDashboardsDto {
  @ApiProperty()
  @IsString()
  name: string;
}
