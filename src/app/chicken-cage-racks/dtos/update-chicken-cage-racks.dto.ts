import { PartialType } from '@nestjs/mapped-types';
import { CreateChickenCageRacksDto } from './create-chicken-cage-racks.dto';

export class UpdateChickenCageRacksDto extends PartialType(CreateChickenCageRacksDto) {}
