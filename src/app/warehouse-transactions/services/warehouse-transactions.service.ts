import { Injectable } from '@nestjs/common';
import { WarehouseTransactionsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateWarehouseTransactionsDto,
  UpdateWarehouseTransactionsDto,
} from '../dtos';
import { catchError, concatMap, from, map } from 'rxjs';
import { DateTime } from 'luxon';
import { PricesRepository } from '@src/app/prices/repositories';

@Injectable()
export class WarehouseTransactionsService {
  constructor(
    private readonly warehousetransactionRepository: WarehouseTransactionsRepository,
    private readonly priceRepository: PricesRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.warehousetransactionRepository.paginate(paginateDto, {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          cage: true,
          site: true,
          createdBy: true,
          items: true,
          price: true,
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
          items: true,
          price: true,
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
    const price = this.priceRepository.find({
      where: {
        siteId,
        type: createWarehouseTransactionsDto.category,
        status: 'ACTIVE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return price.pipe(
      map((data) => data[0]),
      concatMap((priceData) => {
        // Now that you have the price, proceed with creating the warehouse transaction
        return from(
          this.warehousetransactionRepository.create({
            category: createWarehouseTransactionsDto.category,
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
            qty: createWarehouseTransactionsDto.haversts.reduce(
              (a, b) => a + b.qty,
              0,
            ),
            type: createWarehouseTransactionsDto.type,
            price: {
              connect: {
                id: priceData.id,
              },
            },
            weight: createWarehouseTransactionsDto.weight || 0,
            code: `${DateTime.now().toFormat('ddMMyyyy')}-${Math.random() * 1000}`,
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
        );
      }),
      catchError((error) => {
        console.log(error);
        throw new Error(error.message); // Handle the error properly here
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
          qty: updateWarehouseTransactionsDto.haversts?.reduce(
            (acc, item) => acc + item.qty,
            0,
          ),
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
