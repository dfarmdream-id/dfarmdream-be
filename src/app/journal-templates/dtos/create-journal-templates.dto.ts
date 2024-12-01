import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJournalTemplatesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  status: string;
}
