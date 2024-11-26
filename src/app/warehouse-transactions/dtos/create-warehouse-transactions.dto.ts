import { ApiProperty } from '@nestjs/swagger';
import { WarehouseTransactionType } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsString, IsUUID } from 'class-validator';

export class HaverstDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  rackId: string;

  @ApiProperty()
  @IsString()
  @IsInt()
  qty: number;
}

export class CreateWarehouseTransactionsDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  cageId: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  rackId: string;

  @ApiProperty({
    enum: WarehouseTransactionType,
  })
  @IsEnum(WarehouseTransactionType)
  type: 'IN' | 'OUT';

  @ApiProperty()
  @IsInt()
  weight?: number;

  @ApiProperty()
  @IsInt()
  qty?: number;

  @ApiProperty({
    example: [HaverstDto],
  })
  @IsArray()
  haversts: HaverstDto[];
}
