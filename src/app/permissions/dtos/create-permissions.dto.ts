import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionsDto {
  @ApiProperty()
  @IsString()
  name: string;
}
