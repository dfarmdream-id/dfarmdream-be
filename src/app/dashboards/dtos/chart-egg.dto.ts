import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

class DateRange {
  @ApiPropertyOptional()
  @IsOptional()
  start: string;

  @ApiPropertyOptional()
  @IsOptional()
  end: string;
}

export class ChartEggDto {
  // groupBy: 'days' | 'weeks' | 'mont/*hs' | 'years';
  // dateRange: { start: string; end: string };*/

  @ApiProperty()
  groupBy: 'days' | 'weeks' | 'months' | 'years';

  @ApiPropertyOptional()
  @IsOptional()
  dateRange: DateRange;
}
