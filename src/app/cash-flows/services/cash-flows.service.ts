import { Injectable } from '@nestjs/common';
import { CashFlowsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateCashFlowsDto, UpdateCashFlowsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class CashFlowsService {
  constructor(private readonly cashflowRepository: CashFlowsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.cashflowRepository.paginate(paginateDto));
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
        name: createCashFlowsDto.name,
        type: createCashFlowsDto.type,
        remark: createCashFlowsDto.remark,
      }),
    );
  }

  public update(id: string, updateCashFlowsDto: UpdateCashFlowsDto) {
    return from(this.cashflowRepository.update({ id }, updateCashFlowsDto));
  }
}
