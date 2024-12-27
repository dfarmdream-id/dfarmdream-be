import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchesDto } from './create-batches.dto';

export class UpdateBatchesDto extends PartialType(CreateBatchesDto) {}
