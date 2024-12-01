import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalTemplateDetailsDto } from './create-journal-template-details.dto';

export class UpdateJournalTemplateDetailsDto extends PartialType(CreateJournalTemplateDetailsDto) {}
