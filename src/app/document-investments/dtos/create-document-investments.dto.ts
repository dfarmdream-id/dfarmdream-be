import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDocumentInvestmentsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  url: string;
}
