import { ApiProperty } from '@nestjs/swagger';
import { PriceStatus, PriceType } from '@prisma/client';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePricesDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  weightPerUnit: string;

  @ApiProperty({
    enum: PriceStatus,
  })
  @IsEnum(PriceStatus)
  status?: 'ACTIVE' | 'INACTIVE';

  @ApiProperty({
    enum: PriceType,
  })
  @IsEnum(PriceType)
  type: 'EGG' | 'CHICKEN';

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsUUID()
  siteId?: string;
}
