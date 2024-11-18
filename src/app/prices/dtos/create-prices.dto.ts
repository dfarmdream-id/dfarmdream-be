import { ApiProperty } from '@nestjs/swagger';
import { $Enums, PriceStatus, PriceType, Prisma } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreatePricesDto implements Prisma.PriceCreateInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(PriceStatus)
  status?: $Enums.PriceStatus | null | undefined;

  @ApiProperty()
  @IsEnum(PriceType)
  type: $Enums.PriceType;
}
