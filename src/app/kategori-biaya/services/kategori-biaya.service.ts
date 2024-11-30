import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { KategoriBiayaRepository } from '../repositories';
import { CreateKategoriBiaya, UpdateKategoriBiayaDTO } from '../dtos';

@Injectable()
export class KategoriBiayaService {
  constructor(private readonly kategoriBiayaRepository: KategoriBiayaRepository) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.kategoriBiayaRepository.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.kategoriBiayaRepository.firstOrThrow({ id }));
  }

  update(id: string, payload: UpdateKategoriBiayaDTO) {
    return from(this.kategoriBiayaRepository.update({id},payload))
  }

  destroy(id: string) {
    return from(this.kategoriBiayaRepository.delete({ id }));
  }

  create(payload: CreateKategoriBiaya) {
    return from(this.kategoriBiayaRepository.create(payload));
  }
}
