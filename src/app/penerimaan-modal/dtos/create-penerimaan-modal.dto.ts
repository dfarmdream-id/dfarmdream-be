import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePenerimaanModal {
  @ApiProperty()
  @IsString()
  tanggal: string;

  @ApiProperty()
  @IsUUID()
  investorId: string;

  @ApiProperty()
  @IsUUID()
  journalTypeId: string;

  @ApiProperty()
  @IsNotEmpty()
  nominal: number;

  @ApiProperty()
  @IsUUID()
  siteId: string;

  @ApiProperty()
  @IsUUID()
  cageId: string;
}
