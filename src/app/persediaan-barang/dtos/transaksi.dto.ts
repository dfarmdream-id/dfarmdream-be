import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TransaksiBarangDTO {
  @ApiProperty()
  @IsNotEmpty()
  siteId: string;

  @ApiProperty()
  @IsString()
  cageId: string;

  @ApiProperty()
  @IsString()
  barangId: string;

  @ApiProperty()
  @IsNotEmpty()
  qty: number;

  @ApiProperty()
  @IsNotEmpty()
  tipe: string;

  @ApiPropertyOptional()
  @IsOptional()
  keterangan: string;
}
