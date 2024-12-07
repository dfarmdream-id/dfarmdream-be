import { PartialType } from '@nestjs/mapped-types';
import { CreatePenerimaanModal } from './create-penerimaan-modal.dto';

export class UpdatePenerimaanModalDTO extends PartialType(
  CreatePenerimaanModal,
) {}
