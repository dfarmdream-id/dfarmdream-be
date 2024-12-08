import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCoasDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  code: number;

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
