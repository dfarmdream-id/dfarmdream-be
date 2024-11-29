import { ApiPreconditionFailedResponse, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePenerimaanModal {
  @ApiProperty()
  @IsString()
  tanggal: string;

  @ApiProperty()
  @IsUUID()
  investorId: string;

  @ApiProperty()
  @IsNotEmpty()
  nominal: number;

  @ApiProperty()
  @IsUUID()
  siteId:string

  @ApiProperty()
  @IsUUID()
  cageId:string
}
