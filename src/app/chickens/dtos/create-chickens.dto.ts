import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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

  @ApiProperty()
  @IsString()
  diseaseIds: string;
}
