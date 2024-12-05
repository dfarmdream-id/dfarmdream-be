import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentInvestmentsDto } from './create-document-investments.dto';

export class UpdateDocumentInvestmentsDto extends PartialType(
  CreateDocumentInvestmentsDto,
) {}
