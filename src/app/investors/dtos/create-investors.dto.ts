import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInvestorsDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  identityId?: string;
}
