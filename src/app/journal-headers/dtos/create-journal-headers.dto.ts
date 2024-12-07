import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, IsUUID } from 'class-validator';

export class CreateJournalHeadersDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsInt()
  debtTotal: number;

  @ApiProperty()
  @IsInt()
  creditTotal: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsUUID()
  journalTypeId: string;
}
