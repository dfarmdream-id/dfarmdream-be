import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateGroupCoasDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsInt()
  debtTotal: number;

  @ApiProperty()
  @IsInt()
  creditTotal: number;
}
