import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateDocumentInvestmentsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  siteId: string;

  @ApiProperty()
  @IsUUID()
  cageId: string;

  @ApiProperty()
  @IsUUID()
  fileId: string;

  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsUUID()
  investorId: string;
}
