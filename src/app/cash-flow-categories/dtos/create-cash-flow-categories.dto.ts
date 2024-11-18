import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCashFlowCategoriesDto {
  @ApiProperty()
  @IsString()
  name: string;
}
