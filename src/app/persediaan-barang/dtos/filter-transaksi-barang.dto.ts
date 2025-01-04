import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterTransaksiBarangDTO {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  q: string; 

  @ApiPropertyOptional()
  @IsOptional()
  tanggal?:string;

  @ApiPropertyOptional()
  @IsOptional()
  goodId?:string;
}
