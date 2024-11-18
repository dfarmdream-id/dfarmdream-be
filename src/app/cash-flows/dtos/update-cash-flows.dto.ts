import { PartialType } from '@nestjs/mapped-types';
import { CreateCashFlowsDto } from './create-cash-flows.dto';

export class UpdateCashFlowsDto extends PartialType(CreateCashFlowsDto) {}
