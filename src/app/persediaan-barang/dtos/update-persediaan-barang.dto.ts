import { PartialType } from '@nestjs/mapped-types';
import { CreatePersediaanBarang } from './create-persediaan-barang.dto';

export class UpdatePersediaanBarangDTO extends PartialType(
  CreatePersediaanBarang,
) {}
