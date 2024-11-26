import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { IsOptional } from 'class-validator';

export class GetCageRackDto extends PaginationQueryDto {
  @ApiProperty()
  @IsOptional()
  cageId?: string;
}
