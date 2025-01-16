import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBiayaDTO {
  @ApiProperty()
  @IsString()
  kategoriId: string;

  @ApiProperty()
  @IsString()
  tanggal: string;

  @ApiProperty()
  @IsNotEmpty()
  biaya: number;

  @ApiProperty()
  @IsOptional()
  siteId: string;

  @ApiProperty()
  @IsNotEmpty()
  cageId: string;

  @ApiProperty()
  @IsNotEmpty()
  journalTypeId: string;

  @ApiProperty()
  @IsNotEmpty()
  batchId: string;

  @ApiPropertyOptional()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;

  @ApiPropertyOptional()
  @IsOptional()
  persediaanBarangId: string;

  @ApiPropertyOptional()
  @IsOptional()
  qty: string;

  @ApiPropertyOptional()
  @IsOptional()
  keterangan: string;
}
