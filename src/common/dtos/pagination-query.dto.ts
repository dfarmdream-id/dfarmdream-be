import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DateRangeDto {
  @ApiPropertyOptional({
    description:
      'Start date of the date range in ISO 8601 format (e.g., 2024-12-01)',
  })
  @IsISO8601()
  @IsOptional()
  start: string;

  @ApiPropertyOptional({
    description:
      'End date of the date range in ISO 8601 format (e.g., 2024-12-20)',
  })
  @IsISO8601()
  @IsOptional()
  end: string;
}

export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Current page number' })
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @IsNumberString()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional({ description: 'Search query string' })
  @IsOptional()
  q: string;

  @ApiPropertyOptional({ description: 'Sort criteria' })
  @IsOptional()
  sort: string;

  @ApiPropertyOptional({ type: DateRangeDto, description: 'Date range filter' })
  @ValidateNested()
  @Type(() => DateRangeDto)
  @IsOptional()
  dateRange: DateRangeDto;
}
