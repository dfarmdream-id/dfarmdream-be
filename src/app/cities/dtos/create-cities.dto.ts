import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCitiesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  provinceId: string;
}
