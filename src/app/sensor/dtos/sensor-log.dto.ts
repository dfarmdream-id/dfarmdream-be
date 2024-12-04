import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SensorLogDTO {
  @ApiProperty()
  @IsOptional()
  temperature: number;

  @ApiProperty()
  @IsOptional()
  humidity: number;

  @ApiProperty()
  @IsOptional()
  airQuality: number;

  @ApiProperty()
  amonia: number;

  @ApiProperty()
  ldrValue: number;
}
