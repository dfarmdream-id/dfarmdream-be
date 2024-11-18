import { Injectable } from '@nestjs/common';
import { CashFlowCategoriesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCashFlowCategoriesDto, UpdateCashFlowCategoriesDto } from '../dtos';
import { from, Observable } from 'rxjs';

@Injectable()
export class CashFlowCategoriesService {
  constructor(private readonly cashflowcategoryRepository: CashFlowCategoriesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.cashflowcategoryRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.cashflowcategoryRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.cashflowcategoryRepository.delete({ id }));
  }

  public create(createCashFlowCategoriesDto: CreateCashFlowCategoriesDto) {
    return from(this.cashflowcategoryRepository.create(createCashFlowCategoriesDto));
  }

  public update(id: string, updateCashFlowCategoriesDto: UpdateCashFlowCategoriesDto) {
    return from(this.cashflowcategoryRepository.update({ id }, updateCashFlowCategoriesDto));
  }
}

