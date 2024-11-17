import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInvestorsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
