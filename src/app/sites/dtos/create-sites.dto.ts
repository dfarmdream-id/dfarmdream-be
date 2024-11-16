import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSitesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  provinceId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cityId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  districtId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subDistrictId: string;

  @ApiProperty()
  @IsString()
  address: string;
}
