import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDocumentInvestmentsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  url: string;

  @ApiProperty()
  investorId:string;
  
  @ApiProperty()
  fileId:string;

  @ApiProperty()
  cageId:string;
}
