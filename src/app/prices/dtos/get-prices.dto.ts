import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GetPricesDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  startDate: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  endDate: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  siteId: string;

  @ApiPropertyOptional()
  @IsOptional()
  tanggal?: string;
}
