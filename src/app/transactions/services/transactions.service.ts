import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateTransactionsDto, UpdateTransactionsDto } from '../dtos';
import { from } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.transactionRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.transactionRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.transactionRepository.delete({ id }));
  }

  public create(
    createTransactionsDto: CreateTransactionsDto,
    userId: string,
    siteId: string,
  ) {
    return from(
      this.transactionRepository.create({
        cage: {
          connect: {
            id: createTransactionsDto.cageId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
        rack: {
          connect: {
            id: createTransactionsDto.rackId,
          },
        },
        site: {
          connect: {
            id: siteId,
          },
        },
        qty: createTransactionsDto.qty,
        type: createTransactionsDto.type,
        code: DateTime.now().toString(),
      }),
    );
  }

  public update(id: string, updateTransactionsDto: UpdateTransactionsDto) {
    return from(
      this.transactionRepository.update({ id }, updateTransactionsDto),
    );
  }
}
