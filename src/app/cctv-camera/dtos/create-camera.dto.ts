import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCameraDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  ipAddress: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  cageId:number;
}
