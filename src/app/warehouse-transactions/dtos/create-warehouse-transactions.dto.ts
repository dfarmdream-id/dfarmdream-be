import { ApiProperty } from '@nestjs/swagger';
import {
  WarehouseTransactionCategoryEnum,
  WarehouseTransactionType,
} from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsString, IsUUID } from 'class-validator';

export class HaverstDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  rackId: string;

  @ApiProperty()
  @IsInt()
  qty: number;
}

export class CreateWarehouseTransactionsDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  cageId: string;

  @ApiProperty({
    enum: WarehouseTransactionType,
  })
  @IsEnum(WarehouseTransactionType)
  type: 'IN' | 'OUT';

  @ApiProperty()
  @IsInt()
  weight?: number;

  @ApiProperty({
    example: [{ qty: 1, rackId: '' }],
    type: [HaverstDto],
  })
  @IsArray()
  haversts: HaverstDto[];

  @ApiProperty({
    default: 'EGG',
  })
  @IsEnum(WarehouseTransactionCategoryEnum)
  category: `${keyof typeof WarehouseTransactionCategoryEnum}`;
  
  // journalTypeId
  @ApiProperty()
  @IsString()
  journalTypeId: string;
}
