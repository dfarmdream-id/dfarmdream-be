import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChickenCageRacksDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  cageId: string;

  @ApiProperty()
  @IsString()
  createdAt: string;
}
