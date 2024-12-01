import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalTemplatesDto } from './create-journal-templates.dto';

export class UpdateJournalTemplatesDto extends PartialType(CreateJournalTemplatesDto) {}
