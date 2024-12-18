import { ApiPreconditionFailedResponse, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional()
  @IsOptional()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;
  
  @ApiPropertyOptional()
  @IsOptional()
  goodsId:string;
}
