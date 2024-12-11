import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum LedgerEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class CreateJournalTemplateDetailsDto {
  @ApiProperty({
    description: 'Optional ID, provided only for updates',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'The code for the Chart of Accounts (COA)',
  })
  @IsNumber()
  @IsNotEmpty()
  coaCode: number;

  @ApiProperty({
    description: 'The status of the journal detail (e.g., active, inactive)',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The ledger type, must be either DEBIT or CREDIT',
    enum: LedgerEnum,
    enumName: 'LedgerEnum', // Swagger documentation for enum
  })
  @IsEnum(LedgerEnum)
  typeLedger: LedgerEnum;
}
