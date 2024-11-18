import { Injectable } from '@nestjs/common';
import { PricesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreatePricesDto, UpdatePricesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class PricesService {
  constructor(private readonly priceRepository: PricesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.priceRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.priceRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.priceRepository.delete({ id }));
  }

  public create(createPricesDto: CreatePricesDto) {
    return from(this.priceRepository.create(createPricesDto));
  }

  public update(id: string, updatePricesDto: UpdatePricesDto) {
    return from(this.priceRepository.update({ id }, updatePricesDto));
  }
}
