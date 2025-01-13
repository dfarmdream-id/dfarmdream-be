import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateChickensDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  rackId: string;

  @ApiProperty()
  @IsString()
  batchId: string;

  @ApiPropertyOptional()
  @IsOptional()
  diseaseIds: string;
}
