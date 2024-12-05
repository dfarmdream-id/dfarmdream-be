import { Injectable } from '@nestjs/common';
import { CashFlowCategoriesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateCashFlowCategoriesDto,
  UpdateCashFlowCategoriesDto,
} from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class CashFlowCategoriesService {
  constructor(
    private readonly cashflowcategoryRepository: CashFlowCategoriesRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    return from(
      this.cashflowcategoryRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
          siteId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.cashflowcategoryRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.cashflowcategoryRepository.delete({ id }));
  }

  public create(createCashFlowCategoriesDto: CreateCashFlowCategoriesDto) {
    return from(
      this.cashflowcategoryRepository.create(createCashFlowCategoriesDto),
    );
  }

  public update(
    id: string,
    updateCashFlowCategoriesDto: UpdateCashFlowCategoriesDto,
  ) {
    return from(
      this.cashflowcategoryRepository.update(
        { id },
        updateCashFlowCategoriesDto,
      ),
    );
  }
}
