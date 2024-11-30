import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { PersediaanBarangRepository } from '../repositories';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../dtos';
import { FilterPersediaanBarangDTO } from '../dtos/filter-persediaan-barang.dto';

@Injectable()
export class PersediaanBarangService {
  constructor(private readonly persediaanBarangRepo: PersediaanBarangRepository) {}

  paginate(paginateDto: FilterPersediaanBarangDTO) {
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
