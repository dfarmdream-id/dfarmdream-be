import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateChickenCagesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  siteId: string;

  @ApiProperty()
  @IsInt()
  width: number;

  @ApiProperty()
  @IsInt()
  height: number;

  @ApiProperty()
  @IsInt()
  capacity: number;
}
