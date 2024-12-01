import { PartialType } from '@nestjs/mapped-types';
import { CreateJournalHeadersDto } from './create-journal-headers.dto';

export class UpdateJournalHeadersDto extends PartialType(CreateJournalHeadersDto) {}
