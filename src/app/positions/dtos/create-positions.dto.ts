import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  checkinTime: string;

  @ApiProperty()
  @IsString()
  checkoutTime: string;

  @ApiProperty()
  @IsNotEmpty()
  checkKandang:boolean
}
