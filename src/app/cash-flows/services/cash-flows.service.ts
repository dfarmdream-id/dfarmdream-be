import { Injectable } from '@nestjs/common';
import { CashFlowsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCashFlowsDto, UpdateCashFlowsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class CashFlowsService {
  constructor(private readonly cashflowRepository: CashFlowsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.cashflowRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
        include: {
          category: true,
          cage: true,
          createdBy: true,
          site: true,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.cashflowRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.cashflowRepository.delete({ id }));
  }

  public create(
    createCashFlowsDto: CreateCashFlowsDto,
    userId: string,
    siteId: string,
  ) {
    return from(
      this.cashflowRepository.create({
        amount: createCashFlowsDto.amount,
        createdBy: {
          connect: {
            id: userId,
          },
        },
        site: {
          connect: {
            id: siteId,
          },
        },
        cage: {
          connect: {
            id: createCashFlowsDto.cageId,
          },
        },
        name: createCashFlowsDto.name,
        type: createCashFlowsDto.type,
        remark: createCashFlowsDto.remark,
        category: {
          connect: {
            id: createCashFlowsDto.categoryId,
          },
        },
      }),
    );
  }

  public update(id: string, updateCashFlowsDto: UpdateCashFlowsDto) {
    return from(this.cashflowRepository.update({ id }, updateCashFlowsDto));
  }
}
