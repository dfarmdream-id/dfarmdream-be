import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProvincesDto {
  @ApiProperty()
  @IsString()
  name: string;
}
