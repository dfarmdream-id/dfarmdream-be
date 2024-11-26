import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseTransactionsDto } from './create-warehouse-transactions.dto';

export class UpdateWarehouseTransactionsDto extends PartialType(
  CreateWarehouseTransactionsDto,
) {}
