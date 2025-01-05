import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  IsNumber,
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
  @IsNumber()
  coaCode: number;

  @ApiProperty({ description: 'Debit amount' })
  @IsInt()
  debit: number;

  @ApiProperty({ description: 'Credit amount' })
  @IsInt()
  credit: number;

  @ApiProperty({ description: 'Note for the transaction' })
  @IsString()
  note: string;

  @ApiProperty({ description: 'createdAt' })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ description: 'updatedAt' })
  @IsString()
  @IsOptional()
  updatedAt?: string;
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

  @ApiProperty({ description: 'ID of the cage (UUID)' })
  @IsUUID()
  @IsOptional()
  cageId?: string;

  @ApiProperty({ description: 'ID of the batch (UUID)' })
  @IsUUID()
  @IsOptional()
  batchId?: string;

  @ApiProperty({ description: 'ID of the site (UUID)' })
  @IsUUID()
  @IsOptional()
  siteId?: string;

  // createdAt, updatedAt
  @ApiProperty({ description: 'createdAt' })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ description: 'updatedAt' })
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
