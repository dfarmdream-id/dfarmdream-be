import { ApiProperty } from '@nestjs/swagger';
import { SensorType } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class SensorLogDTO {
  @ApiProperty()
  @IsOptional()
  sensorType: SensorType;

  @ApiProperty()
  value: number;

  @ApiProperty()
  @IsOptional()
  sensorCode: string;
}
