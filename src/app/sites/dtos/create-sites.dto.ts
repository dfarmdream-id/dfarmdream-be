import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSitesDto {
  @ApiProperty()
  @IsString()
  name: string;
}
