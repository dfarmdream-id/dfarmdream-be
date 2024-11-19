import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';

export class CreateTransactionsDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  cageId?: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  rackId: string;

  @ApiProperty()
  @IsInt()
  qty: number;

  @ApiProperty({
    enum: TransactionType,
  })
  @IsString()
  @IsEnum(TransactionType)
  type: 'EGG' | 'CHICKEN';
}
