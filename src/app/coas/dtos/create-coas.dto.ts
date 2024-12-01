import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateCoasDto {
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
  @IsBoolean()
  isBalanceSheet: boolean;

  @ApiProperty()
  @IsBoolean()
  isRetainedEarnings: boolean;

  @ApiProperty()
  @IsInt()
  level: number;
}
