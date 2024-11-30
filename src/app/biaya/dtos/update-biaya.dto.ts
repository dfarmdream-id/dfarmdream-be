import { PartialType } from '@nestjs/mapped-types';
import { CreateBiayaDTO } from './create-biaya.dto';

export class UpdateBiayaDTO extends PartialType(CreateBiayaDTO) {}
