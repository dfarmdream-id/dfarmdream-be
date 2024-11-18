import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  q: string;
}
