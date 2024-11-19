import { ApiProperty } from '@nestjs/swagger';
import { PriceStatus, PriceType } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreatePricesDto {
  @ApiProperty()
  @IsString()
  name: string;

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
}
