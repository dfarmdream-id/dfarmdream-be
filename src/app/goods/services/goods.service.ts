import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { GoodsRepository } from '../repositories';
import { CreateGoodsDTO, UpdateGoodsDto } from '../dtos';

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.goodsRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.goodsRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.goodsRepository.delete({ id }));
  }

  public create(payload: CreateGoodsDTO) {
    return from(this.goodsRepository.create(payload));
  }

  public update(id: string, payload: UpdateGoodsDto) {
    return from(this.goodsRepository.update({ id }, payload));
  }
}
