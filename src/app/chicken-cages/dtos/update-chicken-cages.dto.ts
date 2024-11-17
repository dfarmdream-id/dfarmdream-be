import { PartialType } from '@nestjs/mapped-types';
import { CreateChickenCagesDto } from './create-chicken-cages.dto';

export class UpdateChickenCagesDto extends PartialType(CreateChickenCagesDto) {}
