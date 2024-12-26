import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { GoodsRepository } from '../repositories';
import { CreateGoodsDTO, UpdateGoodsDto } from '../dtos';
import { TipeBarang } from '@prisma/client';

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodsRepository) {}

  public paginate(paginateDto: PaginationQueryDto, typeGood: string) {
    return from(
      this.goodsRepository.paginate(paginateDto, {
        where: {
          type: typeGood as TipeBarang,
        },
      }),
    );
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
