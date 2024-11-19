import { ApiProperty } from '@nestjs/swagger';
import { CashFlowType } from '@prisma/client';
import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';

export class CreateCashFlowsDto {
  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty({
    default: 'EXPENSE',
  })
  @IsEnum(CashFlowType)
  type: 'INCOME' | 'EXPENSE';

  @ApiProperty()
  @IsString()
  remark?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: 'ChickenCageId',
  })
  @IsUUID()
  cageId: string;
}
