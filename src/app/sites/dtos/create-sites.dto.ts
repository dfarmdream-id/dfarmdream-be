import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSitesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  provinceId: string;

  @ApiProperty()
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsString()
  districtId: string;

  @ApiProperty()
  @IsString()
  subDistrictId: string;

  @ApiProperty()
  @IsString()
  address: string;
}
