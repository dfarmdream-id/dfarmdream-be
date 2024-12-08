import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJournalTypesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  status: string;
}
