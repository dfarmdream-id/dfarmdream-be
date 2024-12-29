import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CagesRepository } from '@src/app/chicken-cages/repositories';
import { ChickensRepository } from '@src/app/chickens/repositories';
import { InvestorsRepository } from '@src/app/investors/repositories';
import { UsersRepository } from '@src/app/users/repositories';
import { WarehouseTransactionsRepository } from '@src/app/warehouse-transactions/repositories';
import { firstValueFrom, forkJoin, from, map, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/platform/database/services/prisma.service';
import { ChartEggDto } from '@app/dashboards/dtos/chart-egg.dto';

@Injectable()
export class DashboardsService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly chickenCageRepository: CagesRepository,
    private readonly investorRepository: InvestorsRepository,
    private readonly chickendRepository: ChickensRepository,
    private readonly warehouseTransactionRepository: WarehouseTransactionsRepository,
    private readonly prismaService: PrismaService,
  ) {}

  public summary(
    siteId: string,
    {
      date,
      cageId,
    }: {
      date: string;
      cageId: string;
    },
  ) {
    return of({}).pipe(
      switchMap(async () => {
        const user = await this.userRepository.count({
          where: {
            deletedAt: null,
            sites: { some: { siteId: siteId } },
          },
        });

        const cage = await firstValueFrom(
          this.chickenCageRepository.count({
            where: {
              deletedAt: null,
              siteId,
              ...(cageId && { id: cageId }), // Filter by cageId if provided
            },
          }),
        );

        const investor = await firstValueFrom(
          this.investorRepository.count({
            where: {
              deletedAt: null,
              documentInvestment: {
                some: {
                  siteId,
                },
              },
            },
          }),
        );

        const weightTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('weight', {
              type: 'IN',
              deletedAt: null,
              siteId,
              ...(cageId && { cageId }), // Filter by cageId if provided
              ...(date && {
                createdAt: {
                  gte: new Date(`${date}T00:00:00Z`), // Start of the day
                  lt: new Date(`${date}T23:59:59Z`), // End of the day
                },
              }),
            })
            .pipe(map((qty) => qty._sum.weight)),
        );

        const qtyTotal = await firstValueFrom(
          this.warehouseTransactionRepository
            .sum('qty', {
              type: 'IN',
              deletedAt: null,
              siteId,
              ...(cageId && { cageId }), // Filter by cageId if provided
              ...(date && {
                createdAt: {
                  gte: new Date(`${date}T00:00:00Z`), // Start of the day
                  lt: new Date(`${date}T23:59:59Z`), // End of the day
                },
              }),
            })
            .pipe(map((qty) => qty._sum.qty)),
        );

        return {
          user,
          cage,
          investor,
          weightTotal,
          qtyTotal,
        };
      }),
    );
  }

  public chart(
    siteId: string,
    {
      date,
      cageId,
    }: {
      date?: string;
      cageId?: string;
    },
  ) {
    // Parse date range dari query string jika ada
    const dateRange = date
      ? date.split(',').map((d) => new Date(`${d}T00:00:00Z`))
      : null;

    // Helper untuk filter tanggal
    const dateFilter = dateRange
      ? {
          gte: dateRange[0], // Start of date range
          lt: new Date(dateRange[1].setUTCHours(23, 59, 59)), // End of date range
        }
      : null;

    // Kondisi where umum
    const baseWhere = (status: string) => ({
      status: status as any,
      deletedAt: null,
      rack: {
        cage: {
          siteId: siteId,
          ...(cageId && { id: cageId }),
        },
      },
      ...(dateFilter && {
        createdAt: dateFilter,
      }),
    });

    // Menghitung jumlah berdasarkan status menggunakan repository
    const countByStatus = (status: string) =>
      from(
        this.chickendRepository.count({
          where: baseWhere(status),
        }),
      );

    // Menggunakan forkJoin untuk menjalankan semua query secara bersamaan
    return forkJoin({
      alive: countByStatus('ALIVE'),
      dead: countByStatus('DEAD'),
      alive_in_sick: countByStatus('ALIVE_IN_SICK'),
      dead_due_to_illness: countByStatus('DEAD_DUE_TO_ILLNESS'),
      productive: countByStatus('PRODUCTIVE'), // Status baru
      feed_change: countByStatus('FEED_CHANGE'), // Status baru
      spent: countByStatus('SPENT'), // Status baru
      rejuvenation: countByStatus('REJUVENATION'), // Status baru
    });
  }

  public chartEgg(siteId: string, chartEggDto: ChartEggDto) {
    // Map groupBy ke format PostgreSQL DATE_TRUNC
    const groupByMap = {
      days: Prisma.sql`'day'`,
      weeks: Prisma.sql`'week'`,
      months: Prisma.sql`'month'`,
      years: Prisma.sql`'year'`,
    };
    const groupFormat = groupByMap[chartEggDto.groupBy] || Prisma.sql`'day'`;

    // Tentukan interval untuk generate_series
    const intervalMap = {
      days: '1 day',
      weeks: '1 week',
      months: '1 month',
      years: '1 year',
    };
    const interval = intervalMap[chartEggDto.groupBy] || '1 day';

    // Tentukan rentang waktu menggunakan startDate dan endDate dari chartEggDto
    const startDate = chartEggDto.startDate
      ? Prisma.sql`${new Date(chartEggDto.startDate).toISOString()}::TIMESTAMP`
      : Prisma.sql`NOW() - INTERVAL '20 days'`;
    const endDate = chartEggDto.endDate
      ? Prisma.sql`${new Date(chartEggDto.endDate).toISOString()}::TIMESTAMP`
      : Prisma.sql`NOW()`;

    const query = this.prismaService.$queryRaw<
      {
        grouped_date: string;
        total_qty: number | null;
        total_biaya: number | null;
        total_harga: string | null;
      }[]
    >(
      Prisma.sql`
        SELECT
          d.grouped_date,
          COALESCE(SUM(wt."qty"), 0) AS total_qty,
          COALESCE(SUM(b."biaya"), 0) AS total_biaya,
          COALESCE(SUM((wt."weight" * p."value")::BIGINT), 0) AS total_harga
        FROM (
               SELECT
                 GENERATE_SERIES(
                   DATE_TRUNC(${groupFormat}, ${startDate}),
                   DATE_TRUNC(${groupFormat}, ${endDate}),
                   ${interval}::INTERVAL -- Pastikan interval didefinisikan dengan jelas
                 ) AS grouped_date
             ) d
               LEFT JOIN "Biaya" b
                         ON DATE_TRUNC(${groupFormat}, b."updatedAt") = d.grouped_date
                           AND b."siteId" = ${siteId}
          ${chartEggDto.cageId ? Prisma.sql`AND b."cageId" = ${chartEggDto.cageId}` : Prisma.sql``}
      LEFT JOIN "WarehouseTransaction" wt
        ON DATE_TRUNC(${groupFormat}, wt."updatedAt") = d.grouped_date
          AND wt."siteId" = ${siteId}
          AND wt."deletedAt" IS NULL
          AND wt."CashierDeliveryAt" IS NOT NULL
          AND wt."category" = 'EGG'
          ${chartEggDto.cageId ? Prisma.sql`AND wt."cageId" = ${chartEggDto.cageId}` : Prisma.sql``}
          LEFT JOIN "Price" p
          ON wt."priceId" = p."id"
        GROUP BY d.grouped_date
        ORDER BY d.grouped_date ASC
      `,
    );

    // Bungkus Prisma query ke dalam Observable
    return from(query).pipe(
      map((results) =>
        results.map((row) => ({
          date: row.grouped_date,
          total: row.total_qty || 0, // Jika total_qty null, default 0
          totalBiaya: row.total_biaya || 0, // Jika total_biaya null, default 0
          totalHarga: Number(row.total_harga || 0), // Jika total_harga null, default 0
        })),
      ),
    );
  }

  public chartChicken(siteId: string, chartEggDto: ChartEggDto) {
    // Map groupBy ke format PostgreSQL DATE_TRUNC
    const groupByMap = {
      days: Prisma.sql`'day'`,
      weeks: Prisma.sql`'week'`,
      months: Prisma.sql`'month'`,
      years: Prisma.sql`'year'`,
    };
    const groupFormat = groupByMap[chartEggDto.groupBy] || Prisma.sql`'day'`;

    // Tentukan interval untuk rentang waktu
    const interval = Prisma.raw(`'1 ${chartEggDto.groupBy.slice(0, -1)}'::INTERVAL`);

    // Gunakan startDate dan endDate dari chartEggDto, dengan fallback ke interval default
    const startDate = chartEggDto.startDate
      ? Prisma.sql`${new Date(chartEggDto.startDate).toISOString()}::TIMESTAMP`
      : Prisma.sql`NOW() - INTERVAL '20 days'`;
    const endDate = chartEggDto.endDate
      ? Prisma.sql`${new Date(chartEggDto.endDate).toISOString()}::TIMESTAMP`
      : Prisma.sql`NOW()`;

    // Query Prisma dengan raw SQL
    const query = this.prismaService.$queryRaw<
      {
        grouped_date: string;
        total_qty: number | null;
        total_biaya: number | null;
        total_harga: string | null;
      }[]
    >(
      Prisma.sql`
      SELECT
        d.grouped_date,
        COALESCE(SUM(wt."qty"), 0) AS total_qty,
        COALESCE(SUM(b."biaya"), 0) AS total_biaya,
        COALESCE(SUM((wt."weight" * p."value")::BIGINT), 0) AS total_harga
      FROM (
        SELECT
          generate_series(
            DATE_TRUNC(${groupFormat}, ${startDate}),
            DATE_TRUNC(${groupFormat}, ${endDate}),
            ${interval}
          ) AS grouped_date
      ) d
      LEFT JOIN "Biaya" b
        ON DATE_TRUNC(${groupFormat}, b."updatedAt") = d.grouped_date
        AND b."siteId" = ${siteId}
        ${chartEggDto.cageId ? Prisma.sql`AND b."cageId" = ${chartEggDto.cageId}` : Prisma.sql``}
      LEFT JOIN "WarehouseTransaction" wt
        ON DATE_TRUNC(${groupFormat}, wt."updatedAt") = d.grouped_date
        AND wt."siteId" = ${siteId}
        AND wt."deletedAt" IS NULL
        AND wt."CashierDeliveryAt" IS NOT NULL
        AND wt."category" = 'CHICKEN'
        ${chartEggDto.cageId ? Prisma.sql`AND wt."cageId" = ${chartEggDto.cageId}` : Prisma.sql``}
      LEFT JOIN "Price" p
        ON wt."priceId" = p."id"
      GROUP BY d.grouped_date
      ORDER BY d.grouped_date ASC
    `,
    );

    // Bungkus query Prisma dalam Observable
    return from(query).pipe(
      map((results) =>
        results.map((row) => ({
          date: row.grouped_date,
          total: row.total_qty || 0,
          totalBiaya: row.total_biaya || 0,
          totalHarga: Number(row.total_harga || 0),
        })),
      ),
    );
  }

  public chartDisease(
    siteId: string,
    {
      date,
      cageId,
    }: {
      date: string;
      cageId: string;
    },
  ) {
    const dateRange = date
      ? date.split(',').map((d) => new Date(`${d}T00:00:00Z`))
      : null;

    const query = this.prismaService.$queryRaw<
      {
        disease: string;
        total: number;
      }[]
    >(
      Prisma.sql`
      SELECT
        d."name" AS disease,
        COUNT(c."id") AS total
      FROM "Chicken" c
      LEFT JOIN "ChickenDisease" d ON c."diseaseId" = d."id"
      LEFT JOIN "CageRack" cr ON c."rackId" = cr."id"
      LEFT JOIN "Cage" cg ON cr."cageId" = cg."id"
      WHERE cg."siteId" = ${siteId} AND c."deletedAt" IS NULL AND c."diseaseId" IS NOT NULL
      ${cageId ? Prisma.sql`AND cg."id" = ${cageId}` : Prisma.sql``}
      ${dateRange ? Prisma.sql`AND c."updatedAt" >= ${dateRange[0]} AND c."updatedAt" <= ${dateRange[1]}` : Prisma.sql``}
      GROUP BY d."name"
    `,
    );

    return from(query).pipe(
      map((results) =>
        results.map((row) => ({
          disease: row.disease || 'Tidak Diketahui', // Handle null name
          total: row.total,
        })),
      ),
    );
  }
}
