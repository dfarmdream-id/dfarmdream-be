import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalTemplateDetailsDto } from '@app/journal-templates/dtos/create-journal-template-details.dto';

export class UpdateJournalTemplateDetailsDto extends PartialType(
  CreateJournalTemplateDetailsDto,
) {}
