import { ApiProperty } from '@nestjs/swagger';
import { WarehouseTransactionType } from '@prisma/client';
import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';

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
}
