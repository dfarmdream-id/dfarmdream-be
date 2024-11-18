import { ApiProperty } from '@nestjs/swagger';
import { CashFlowType } from '@prisma/client';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreateCashFlowsDto {
  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsEnum(CashFlowType)
  type: 'INCOME' | 'EXPENSE';

  @ApiProperty()
  @IsString()
  remark?: string | null | undefined;

  @ApiProperty()
  @IsString()
  name: string;
}
