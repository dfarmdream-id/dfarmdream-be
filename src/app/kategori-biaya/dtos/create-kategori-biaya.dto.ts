import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateKategoriBiaya {
  @ApiProperty()
  @IsString()
  namaKategori: string;

  @ApiProperty()
  @IsString()
  kodeAkun: string;

  @ApiProperty()
  @IsOptional()
  status: number;
}
