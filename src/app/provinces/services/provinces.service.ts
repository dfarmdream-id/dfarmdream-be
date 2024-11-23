import { Injectable } from '@nestjs/common';
import { ProvincesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateProvincesDto, UpdateProvincesDto } from '../dtos';
import { from, Observable } from 'rxjs';

@Injectable()
export class ProvincesService {
  constructor(private readonly provinceRepository: ProvincesRepository) {}
 
  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.provinceRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.provinceRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.provinceRepository.delete({ id }));
  }

  public create(createProvincesDto: CreateProvincesDto) {
    return from(this.provinceRepository.create(createProvincesDto));
  }

  public update(id: string, updateProvincesDto: UpdateProvincesDto) {
    return from(this.provinceRepository.update({ id }, updateProvincesDto));
  }
}

