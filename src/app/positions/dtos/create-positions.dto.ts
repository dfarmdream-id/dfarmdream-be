import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePositionsDto {
  @ApiProperty()
  @IsString()
  name: string;
}
