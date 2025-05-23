import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDTO {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  cageId: number;

  @ApiProperty()
  @IsNotEmpty()
  tempMinThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  humidityMinThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  amoniaMinThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  tempThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  humidityThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  amoniaThreshold: number;

  @ApiProperty()
  @IsNotEmpty()
  ldrThreshold: number;
}
