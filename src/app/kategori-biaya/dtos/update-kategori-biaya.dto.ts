import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriBiaya } from './create-kategori-biaya.dto';

export class UpdateKategoriBiayaDTO extends PartialType(CreateKategoriBiaya) {}
