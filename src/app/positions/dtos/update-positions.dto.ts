import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionsDto } from './create-positions.dto';

export class UpdatePositionsDto extends PartialType(CreatePositionsDto) {}
