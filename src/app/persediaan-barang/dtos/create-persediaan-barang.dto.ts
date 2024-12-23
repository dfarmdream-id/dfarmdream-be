import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePersediaanBarang {
  @ApiProperty()
  @IsString()
  goodId: string;

  @ApiProperty()
  @IsNotEmpty()
  qty: number;

  @ApiProperty()
  @IsNotEmpty()
  harga: number;

  @ApiProperty()
  @IsOptional()
  total: number;

  @ApiProperty()
  @IsString()
  siteId: string;

  @ApiProperty()
  @IsString()
  cageId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  journalTypeId?: string;
}
