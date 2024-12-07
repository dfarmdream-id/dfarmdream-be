import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCoasDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsBoolean()
  isBalanceSheet: boolean;

  @ApiProperty()
  @IsBoolean()
  isRetainedEarnings: boolean;

  @ApiProperty()
  @IsNotEmpty()
  groupId:string;

  @ApiProperty()
  @IsInt()
  level: number;
}
