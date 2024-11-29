import { ApiPreconditionFailedResponse, ApiProperty } from '@nestjs/swagger';
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
  biaya:number;

  @ApiProperty()
  @IsOptional()
  siteId: string;

  @ApiProperty()
  @IsNotEmpty()
  cageId:string;

  @ApiProperty()
  @IsNotEmpty()
  userId:string;

  @ApiProperty()
  @IsNotEmpty()
  status:number;
}
