import { Injectable } from '@nestjs/common';
import { WarehouseTransactionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateWarehouseTransactionsDto,
  UpdateWarehouseTransactionsDto,
} from '../dtos';
import { catchError, from } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable()
export class WarehouseTransactionsService {
  constructor(
    private readonly warehousetransactionRepository: WarehouseTransactionsRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.warehousetransactionRepository.paginate(paginateDto, {
        include: {
          cage: true,
          site: true,
          createdBy: true,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.warehousetransactionRepository.firstOrThrow(
        { id },
        {
          cage: true,
          site: true,
          createdBy: true,
        },
      ),
    );
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
        code: `${DateTime.now().toFormat('ddMMyyyy')}-${Math.random()}`,
        items: {
          createMany: {
            data: createWarehouseTransactionsDto.haversts.map((item) => {
              return {
                createdById: userId,
                rackId: item.rackId,
                qty: item.qty,
              };
            }),
            skipDuplicates: true,
          },
        },
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
    userId: string,
  ) {
    return from(
      this.warehousetransactionRepository.update(
        { id },
        {
          cage: {
            connect: {
              id: updateWarehouseTransactionsDto.cageId,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
          qty: updateWarehouseTransactionsDto.qty || 0,
          type: updateWarehouseTransactionsDto.type,
          weight: updateWarehouseTransactionsDto.weight || 0,
          code: `${DateTime.now().toFormat('ddMMyyyy')}-${Math.random()}`,
          items: {
            deleteMany: {},
            createMany: {
              data:
                updateWarehouseTransactionsDto.haversts?.map((item) => {
                  return {
                    createdById: userId,
                    rackId: item.rackId,
                    qty: item.qty,
                  };
                }) || [],
              skipDuplicates: true,
            },
          },
        },
      ),
    );
  }
}
