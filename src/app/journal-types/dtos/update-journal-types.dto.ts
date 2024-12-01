import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalTypesDto } from './create-journal-types.dto';

export class UpdateJournalTypesDto extends PartialType(CreateJournalTypesDto) {}
