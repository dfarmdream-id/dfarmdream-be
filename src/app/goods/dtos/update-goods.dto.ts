import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsDTO } from './create-goods.dto';

export class UpdateGoodsDto extends PartialType(CreateGoodsDTO) {}
