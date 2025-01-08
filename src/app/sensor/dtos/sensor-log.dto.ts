import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SensorType } from '@prisma/client';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
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

export class PaginateSensorLog extends PaginationQueryDto{
  @ApiPropertyOptional()
  @IsOptional()
  sensorId:string;

  @ApiPropertyOptional()
  @IsOptional()
  date:string;

}