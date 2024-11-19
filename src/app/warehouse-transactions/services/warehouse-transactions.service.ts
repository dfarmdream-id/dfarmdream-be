import { Injectable } from '@nestjs/common';
import { WarehouseTransactionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateWarehouseTransactionsDto,
  UpdateWarehouseTransactionsDto,
} from '../dtos';
import { catchError, from } from 'rxjs';

@Injectable()
export class WarehouseTransactionsService {
  constructor(
    private readonly warehousetransactionRepository: WarehouseTransactionsRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.warehousetransactionRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.warehousetransactionRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.warehousetransactionRepository.delete({ id }));
  }

  public create(
    createWarehouseTransactionsDto: CreateWarehouseTransactionsDto,
    userId: string,
    siteId: string,
  ) {
    return from(
      this.warehousetransactionRepository.create({
        cage: {
          connect: {
            id: createWarehouseTransactionsDto.cageId,
          },
        },
        rack: {
          connect: {
            id: createWarehouseTransactionsDto.rackId,
          },
        },
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
        qty: createWarehouseTransactionsDto.qty || 0,
        type: createWarehouseTransactionsDto.type,
        weight: createWarehouseTransactionsDto.weight || 0,
      }),
    ).pipe(
      catchError((error) => {
        console.log(error);
        throw new Error(error.message);
      }),
    );
  }

  public update(
    id: string,
    updateWarehouseTransactionsDto: UpdateWarehouseTransactionsDto,
  ) {
    return from(
      this.warehousetransactionRepository.update(
        { id },
        updateWarehouseTransactionsDto,
      ),
    );
  }
}
