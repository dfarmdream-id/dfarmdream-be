import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class GetDocumentInvestmentDto extends PaginationQueryDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  investorId: string;
}
