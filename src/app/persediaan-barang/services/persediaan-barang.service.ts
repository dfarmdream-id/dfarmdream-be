import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { PersediaanBarangRepository } from '../repositories';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../dtos';

@Injectable()
export class PersediaanBarangService {
  constructor(private readonly persediaanBarangRepo: PersediaanBarangRepository) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.persediaanBarangRepo.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.persediaanBarangRepo.firstOrThrow({ id }));
  }

  update(id: string, payload: UpdatePersediaanBarangDTO) {
    return from(this.persediaanBarangRepo.update({id},payload))
  }

  destroy(id: string) {
    return from(this.persediaanBarangRepo.delete({ id }));
  }

  create(payload: CreatePersediaanBarang) {
    return from(this.persediaanBarangRepo.create(payload));
  }
}
