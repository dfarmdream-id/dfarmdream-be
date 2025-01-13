import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class FilterBiayaDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  cageId?: string;

  @IsOptional()
  @IsString()
  categoryBiayaId?: string;

  @IsOptional()
  @IsString()
  goodId?: string;
}
