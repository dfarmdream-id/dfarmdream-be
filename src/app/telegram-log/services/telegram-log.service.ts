import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { FilterLogDTO } from '../dtos';
import { Prisma } from '@prisma/client';

@Injectable()
export class TelegramLogService {
  constructor(private prismaService: PrismaService) {}

  async getTelegramLog(filter: FilterLogDTO, siteId: string) {
    let where: Prisma.TelegramMesasgeLogWhereInput = {};
    where = {
      sensor: {
        cage: {
          siteId: filter.lokasi ?? siteId,
        },
      },
    };

    if (filter.search) {
      where = {
        ...where,
        OR: [
          {
            user: {
              fullName: { contains: filter.search, mode: 'insensitive' },
            },
          },
          {
            sensor: {
              cage: { name: { contains: filter.search, mode: 'insensitive' } },
            },
          },
          {
            sensor: {
              cage: {
                site: {
                  name: { contains: filter.search, mode: 'insensitive' },
                },
              },
            },
          },
        ],
      };
    }

    if (filter.tanggal) {
      const [startDate, endDate] = filter.tanggal.split(',');
      where = {
        ...where,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      };
    }

    if (filter.kandang) {
      where = {
        ...where,
        sensor: {
          cageId: filter.kandang,
        },
      };
    }

    if (filter.lokasi) {
      where = {
        ...where,
        sensor: {
          cage: {
            siteId: filter.lokasi,
          },
        },
      };
    }

    const skip: number = ((filter.page ?? 1) - 1) * (filter.limit ?? 10);
    const take: number = Number(filter.limit ?? 10);

    const listData = await this.prismaService.telegramMesasgeLog.findMany({
      where,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        sensor: {
          include: {
            cage: {
              include: {
                site: true,
              },
            },
          },
        },
      },
    });

    const totalRecords = await this.prismaService.telegramMesasgeLog.count({
      where,
    });
    const totalPages = Math.ceil(totalRecords / (filter.limit ?? 10));
    return {
      status: HttpStatus.OK,
      message: 'Success get telegram log data',
      data: {
        data: listData,
        meta: {
          totalRecords,
          currentPage: filter.page,
          totalPages,
          pageSize: filter.limit,
        },
      },
    };
  }
}
