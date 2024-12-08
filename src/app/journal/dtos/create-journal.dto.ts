import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJournalDetailDto {
  @ApiProperty({
    description: 'Optional ID, provided only for updates',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: 'Code of the COA' })
  @IsString()
  coaCode: string;

  @ApiProperty({ description: 'Debit amount' })
  @IsInt()
  debit: number;

  @ApiProperty({ description: 'Credit amount' })
  @IsInt()
  credit: number;

  @ApiProperty({ description: 'Note for the transaction' })
  @IsString()
  note: string;
}

export class CreateJournalDto {
  @ApiProperty({ description: 'Unique code for the journal' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Date of the journal' })
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Total debit amount' })
  @IsInt()
  debtTotal: number;

  @ApiProperty({ description: 'Total credit amount' })
  @IsInt()
  creditTotal: number;

  @ApiProperty({ description: 'Status of the journal' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'ID of the journal type (UUID)' })
  @IsUUID()
  journalTypeId: string;

  @ApiProperty({
    description: 'Details of the journal entries',
    type: [CreateJournalDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalDetailDto)
  details: CreateJournalDetailDto[];
}
