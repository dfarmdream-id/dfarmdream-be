import { Injectable } from '@nestjs/common';
import { PricesRepository } from '../repositories';
import { CreatePricesDto, UpdatePricesDto } from '../dtos';
import { from, switchMap } from 'rxjs';
import { Prisma } from '@prisma/client';
import { GetPricesDto } from '../dtos/get-prices.dto';

@Injectable()
export class PricesService {
  constructor(private readonly priceRepository: PricesRepository) {}

  public paginate(paginateDto: GetPricesDto) {
    const where = {
      OR: [
        {
          name: {
            contains: paginateDto.q,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    };

    if (paginateDto.startDate && paginateDto.endDate) {
      Object.assign(where, {
        createdAt: {
          gte: new Date(paginateDto.startDate),
          lte: new Date(paginateDto.endDate),
        },
      });
    }

    if (paginateDto.siteId) {
      Object.assign(where, {
        siteId: paginateDto.siteId,
      });
    }

    return from(
      this.priceRepository.paginate(paginateDto, {
        include: {
          site: true,
        },
        where: where,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.priceRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.priceRepository.delete({ id }));
  }

  public create(createPricesDto: CreatePricesDto) {
    return from(
      this.priceRepository.create({
        name: createPricesDto.name,
        status: createPricesDto.status,
        type: createPricesDto.type,
        value: createPricesDto.value,
        site: {
          connect: {
            id: createPricesDto.siteId,
          },
        },
      }),
    ).pipe(
      switchMap(async (data) => {
        this.priceRepository
          .updateMany(
            {
              NOT: {
                id: data.id,
                siteId: data.siteId,
                type: data.type,
              },
              status: 'ACTIVE',
            },
            {
              status: 'INACTIVE',
            },
          )
          .subscribe();
        return data;
      }),
    );
  }

  public update(id: string, updatePricesDto: UpdatePricesDto) {
    return from(this.priceRepository.update({ id }, updatePricesDto));
  }
}
