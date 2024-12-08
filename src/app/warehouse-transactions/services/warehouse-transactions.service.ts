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
import {
  Prisma,
  WarehouseTransactionCategoryEnum,
  WarehouseTransactionType,
} from '@prisma/client';

@Injectable()
export class WarehouseTransactionsService {
  constructor(
    private readonly warehousetransactionRepository: WarehouseTransactionsRepository,
    private readonly priceRepository: PricesRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    const { q } = paginateDto;

    const searchConditions: Prisma.WarehouseTransactionWhereInput[] = [];

    if (q && q.length > 0) {
      // Mapping untuk type dan category
      const typeMapping: Record<string, WarehouseTransactionType> = {
        masuk: 'IN',
        keluar: 'OUT',
      };

      const categoryMapping: Record<string, WarehouseTransactionCategoryEnum> =
        {
          telur: 'EGG',
          ayam: 'CHICKEN',
        };

      // Mapping nilai pencarian
      const mappedType =
        typeMapping[q.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')] || null;
      const mappedCategory =
        categoryMapping[q.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')] || null;

      // Filter `OR` conditions dynamically

      if (mappedType) {
        searchConditions.push({ type: { equals: mappedType } });
      }

      if (mappedCategory) {
        searchConditions.push({ category: { equals: mappedCategory } });
      }

      searchConditions.push(
        { site: { name: { contains: q, mode: 'insensitive' } } },
        { cage: { name: { contains: q, mode: 'insensitive' } } },
        { createdBy: { fullName: { contains: q, mode: 'insensitive' } } },
      );
    }

    const where: Prisma.WarehouseTransactionWhereInput = {
      siteId,
      ...(searchConditions.length > 0 && { OR: searchConditions }),
    };

    // Debugging untuk `where` (Opsional)
    console.log('Generated Where Clause:', JSON.stringify(where, null, 2));

    // Mengembalikan hasil paginasi
    return this.warehousetransactionRepository.paginate(paginateDto, {
      where,
      include: {
        cage: true,
        site: true,
        createdBy: true,
        items: true,
        price: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
      map((data) => {
        if (!data[0]) {
          throw new Error(
            `Harga untuk kategori ${createWarehouseTransactionsDto.category} belum tersedia, silahkan tambahkan harga terlebih dahulu`,
          );
        }
        return data[0];
      }),
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
