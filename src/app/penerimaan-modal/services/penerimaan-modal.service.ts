import { Injectable } from '@nestjs/common';
import { CreatePenerimaanModal } from '../dtos/create-penerimaan-modal.dto';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { UpdatePenerimaanModalDTO } from '../dtos/update-penerimaan-modal.dto';
import { PenerimaanModalRepository } from '../repositories/penerimaan-modal.repository';
import { from } from 'rxjs';

@Injectable()
export class PenerimaanModalService {
  constructor(
    private readonly penerimaanModalRepo: PenerimaanModalRepository,
  ) {}

  create(payload: CreatePenerimaanModal) {
    return from(this.penerimaanModalRepo.create(payload));
  }

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.penerimaanModalRepo.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.penerimaanModalRepo.firstOrThrow({ id }));
  }

  update(id: string, payload: UpdatePenerimaanModalDTO) {
    return from(this.penerimaanModalRepo.update({ id }, payload));
  }

  destroy(id: string) {
    return from(this.penerimaanModalRepo.delete({ id }));
  }
}
