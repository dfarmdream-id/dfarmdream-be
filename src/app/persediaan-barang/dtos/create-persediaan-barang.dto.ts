import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum TipeBarangDTO {
  PAKAN,
  OBAT
}

export class CreatePersediaanBarang {
  @ApiProperty()
  @IsString()
  namaBarang: string;

  @ApiProperty()
  @IsNotEmpty()
  qty: number;

  @ApiProperty()
  @IsNotEmpty()
  harga: number;

  @ApiProperty()
  @IsOptional()
  total:number

  @ApiProperty()
  @IsString()
  siteId:string

  @ApiProperty()
  @IsString()
  cageId:string

  @ApiProperty()
  @IsString()
  tipeBarang:TipeBarangDTO
}
