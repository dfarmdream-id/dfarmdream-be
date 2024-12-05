import { PartialType } from '@nestjs/mapped-types';
import { CreateCashFlowCategoriesDto } from './create-cash-flow-categories.dto';

export class UpdateCashFlowCategoriesDto extends PartialType(
  CreateCashFlowCategoriesDto,
) {}
