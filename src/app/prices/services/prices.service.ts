import { Injectable } from '@nestjs/common';
import { PricesRepository } from '../repositories';
import { CreatePricesDto, UpdatePricesDto } from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';
import { GetPricesDto } from '../dtos/get-prices.dto';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { PaginatedEntity } from '@src/common/entities/paginated.entity';
import moment from 'moment';

@Injectable()
export class PricesService {
  constructor(
    private readonly priceRepository: PricesRepository,
    private readonly prismaService: PrismaService,
  ) {}

  public paginate(paginateDto: GetPricesDto, siteId?: string) {
    const where = {
      OR: [
        {
          name: {
            contains: paginateDto.q,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          site: {
            name: {
              contains: paginateDto.q,
              mode: Prisma.QueryMode.insensitive,
            },
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

    // if (paginateDto.siteId) {
    //   Object.assign(where, {
    //     siteId: paginateDto.siteId ?? siteId,
    //   });
    // }

    return from(
      this.priceRepository.paginate(paginateDto, {
        include: {
          site: true,
        },
        where: {
          ...where,
          siteId,
          status: 'ACTIVE',
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  async getLogData(paginateDto: GetPricesDto, id: string) {
    let where = {};

    const price = await this.prismaService.price.findFirst({ where: { id } });

    if (paginateDto.siteId) {
      Object.assign(where, {
        siteId: paginateDto.siteId,
      });
    } else {
      Object.assign(where, {
        siteId: price?.siteId,
      });
    }
    const { limit = 10, page = 1 } = paginateDto;

    if (price && price.type) {
      Object.assign(where, {
        type: price.type,
      });
    }

    if (paginateDto.tanggal) {
      const [startDate, endDate] = paginateDto.tanggal.split(',');
      where = {
        ...where,
        createdAt: {
          gte: moment(startDate).startOf('day').toDate(),
          lte: moment(endDate).endOf('day').toDate(),
        },
      };
    }

    const data = await this.prismaService.priceLog.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        site: true,
        user: true,
      },
    });

    const count = await this.prismaService.price.count({
      where: where,
    });

    return new PaginatedEntity(data, {
      limit,
      page,
      totalData: count,
    });
  }

  public detail(id: string) {
    return from(this.priceRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.priceRepository.delete({ id }));
  }

  // public create(createPricesDto: CreatePricesDto) {
  //   return from(
  //     this.priceRepository.create({
  //       name: createPricesDto.name,
  //       status: createPricesDto.status,
  //       type: createPricesDto.type,
  //       value: createPricesDto.value,
  //       site: {
  //         connect: {
  //           id: createPricesDto.siteId,
  //         },
  //       },
  //     }),
  //   ).pipe(
  //     switchMap(async (data) => {
  //       this.priceRepository
  //         .updateMany(
  //           {
  //             NOT: {
  //               id: data.id,
  //               siteId: data.siteId,
  //               type: data.type,
  //             },
  //             status: 'ACTIVE',
  //           },
  //           {
  //             status: 'INACTIVE',
  //           },
  //         )
  //         .subscribe();
  //       return data;
  //     }),
  //   );
  // }

  public async create(createPricesDto: CreatePricesDto, userId: string) {
    console.log('createPricesDto:', createPricesDto);

    if (!createPricesDto.siteId) {
      throw new Error('siteId is required');
    }

    const siteExists = await this.prismaService.site.findUnique({
      where: { id: createPricesDto.siteId },
    });

    if (!siteExists) {
      throw new Error(`Site with id ${createPricesDto.siteId} does not exist`);
    }

    const savedData = await this.prismaService.price.create({
      data: {
        name: createPricesDto.name,
        status: createPricesDto.status,
        type: createPricesDto.type,
        weightPerUnit: parseFloat(createPricesDto.weightPerUnit),
        value: createPricesDto.value,
        site: {
          connect: {
            id: createPricesDto.siteId,
          },
        },
      },
    });

    console.log('savedData:', savedData);

    await this.prismaService.price.updateMany({
      where: {
        siteId: createPricesDto.siteId, // Hanya di site yang sama
        type: createPricesDto.type, // Hanya untuk type yang sama (AYAM, TELUR, dll.)
        status: 'ACTIVE', // Hanya yang aktif
        NOT: {
          id: savedData.id, // Jangan update data yang baru saja disimpan
        },
      },
      data: {
        status: 'INACTIVE', // Nonaktifkan data sebelumnya
      },
    });

    await this.prismaService.priceLog.create({
      data: {
        siteId: createPricesDto.siteId,
        type: createPricesDto.type!,
        price: createPricesDto.value!,
        userId: userId,
      },
    });

    return savedData;
  }

  public async update(
    id: string,
    updatePricesDto: UpdatePricesDto,
    userId: string,
    siteId: string,
  ) {
    // Parsing nilai yang seharusnya menjadi float
    const parsedData = {
      ...updatePricesDto,
      siteId: siteId,
      weightPerUnit: updatePricesDto.weightPerUnit
        ? parseFloat(updatePricesDto.weightPerUnit)
        : 0.0, // Jika null atau undefined, tetap null
    };

    // Update data di database
    await this.prismaService.price.update({
      where: {
        id: id,
      },
      data: parsedData,
    });

    // Simpan log harga
    await this.prismaService.priceLog.create({
      data: {
        siteId: updatePricesDto.siteId!,
        type: updatePricesDto.type!,
        price: updatePricesDto.value!,
        userId: userId,
      },
    });

    return this.priceRepository.update({ id }, parsedData);
  }
}
