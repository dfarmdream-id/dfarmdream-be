import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CagesRepository } from '@src/app/chicken-cages/repositories';
import { ChickensRepository } from '@src/app/chickens/repositories';
import { InvestorsRepository } from '@src/app/investors/repositories';
import { UsersRepository } from '@src/app/users/repositories';
import { WarehouseTransactionsRepository } from '@src/app/warehouse-transactions/repositories';
import { firstValueFrom, forkJoin, from, map, of, switchMap } from 'rxjs';
import { PrismaService } from 'src/platform/database/services/prisma.service';

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
    });
  }

  public chartEgg(
    siteId: string,
    groupBy: 'days' | 'weeks' | 'months' | 'years' = 'days',
  ) {
    // Map groupBy ke format PostgreSQL DATE_TRUNC
    const groupByMap = {
      days: Prisma.sql`'day'`,
      weeks: Prisma.sql`'week'`,
      months: Prisma.sql`'month'`,
      years: Prisma.sql`'year'`,
    };
    const groupFormat = groupByMap[groupBy] || Prisma.sql`'day'`;

    // Prisma query dalam raw SQL
    const query = this.prismaService.$queryRaw<
      {
        grouped_date: string;
        total_qty: number;
        total_biaya: number;
        total_harga: string;
      }[]
    >(
      Prisma.sql`
        SELECT
          DATE_TRUNC(${groupFormat}, COALESCE(wt."updatedAt", b."updatedAt")) AS grouped_date,
          COALESCE(SUM(wt."qty"), 0) AS total_qty,
          SUM(b."biaya") AS total_biaya,
          COALESCE(SUM((wt."weight" * p."value")::BIGINT), 0) AS total_harga
        FROM "Biaya" b
               LEFT JOIN "WarehouseTransaction" wt
                         ON DATE_TRUNC(${groupFormat}, wt."updatedAt") = DATE_TRUNC(${groupFormat}, b."updatedAt")
                           AND wt."siteId" = ${siteId}
                           AND wt."deletedAt" IS NULL
                           AND wt."CashierDeliveryAt" IS NOT NULL
               LEFT JOIN "Price" p
                         ON wt."priceId" = p."id"
        WHERE b."siteId" = ${siteId} AND wt."category" = 'EGG'
        GROUP BY DATE_TRUNC(${groupFormat}, COALESCE(wt."updatedAt", b."updatedAt"))
        ORDER BY grouped_date ASC
      `,
    );

    // Bungkus Prisma query ke dalam Observable
    return from(query).pipe(
      map((results) =>
        results.map((row) => ({
          date: row.grouped_date,
          total: row.total_qty,
          totalBiaya: row.total_biaya,
          totalHarga: Number(row.total_harga), // Konversi dari string ke number
        })),
      ),
    );
  }

  public chartChicken(
    siteId: string,
    groupBy: 'days' | 'weeks' | 'months' | 'years' = 'days',
  ) {
    // Map groupBy ke format PostgreSQL DATE_TRUNC
    const groupByMap = {
      days: Prisma.sql`'day'`,
      weeks: Prisma.sql`'week'`,
      months: Prisma.sql`'month'`,
      years: Prisma.sql`'year'`,
    };
    const groupFormat = groupByMap[groupBy] || Prisma.sql`'day'`;

    // Prisma query dalam raw SQL
    const query = this.prismaService.$queryRaw<
      {
        grouped_date: string;
        total_qty: number;
        total_biaya: number;
        total_harga: string;
      }[]
    >(
      Prisma.sql`
        SELECT
          DATE_TRUNC(${groupFormat}, COALESCE(wt."updatedAt", b."updatedAt")) AS grouped_date,
          COALESCE(SUM(wt."qty"), 0) AS total_qty,
          SUM(b."biaya") AS total_biaya,
          COALESCE(SUM((wt."weight" * p."value")::BIGINT), 0) AS total_harga
        FROM "Biaya" b
               LEFT JOIN "WarehouseTransaction" wt
                         ON DATE_TRUNC(${groupFormat}, wt."updatedAt") = DATE_TRUNC(${groupFormat}, b."updatedAt")
                           AND wt."siteId" = ${siteId}
                           AND wt."deletedAt" IS NULL
                           AND wt."CashierDeliveryAt" IS NOT NULL
               LEFT JOIN "Price" p
                         ON wt."priceId" = p."id"
        WHERE b."siteId" = ${siteId} AND wt."category" = 'CHICKEN'
        GROUP BY DATE_TRUNC(${groupFormat}, COALESCE(wt."updatedAt", b."updatedAt"))
        ORDER BY grouped_date ASC
      `,
    );

    // Bungkus Prisma query ke dalam Observable
    return from(query).pipe(
      map((results) =>
        results.map((row) => ({
          date: row.grouped_date,
          total: row.total_qty,
          totalBiaya: row.total_biaya,
          totalHarga: Number(row.total_harga), // Konversi dari string ke number
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
