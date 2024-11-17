import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorsDto } from './create-investors.dto';

export class UpdateInvestorsDto extends PartialType(CreateInvestorsDto) {}
