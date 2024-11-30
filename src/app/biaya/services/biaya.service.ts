import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { BiayaRepository } from '../repositories';
import { CreateBiayaDTO, UpdateBiayaDTO } from '../dtos';

@Injectable()
export class BiayaService {
  constructor(private readonly biayaRepository: BiayaRepository ) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.biayaRepository.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.biayaRepository.firstOrThrow({ id }));
  }

  update(id: string, UpdateBiayaDTO: UpdateBiayaDTO) {
    return from(this.biayaRepository.update({id}, UpdateBiayaDTO))
  }

  destroy(id: string) {
    return from(this.biayaRepository.delete({ id }));
  }

  create(payload: CreateBiayaDTO) {
    return from(this.biayaRepository.create(payload));
  }
}
