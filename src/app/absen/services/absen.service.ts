import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaAbsenService } from '@src/platform/database/services/prisma-absen.service';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { FilterAbsenDTO } from '../dtos/filter-absen.dto';
import { DateTime } from 'luxon';
@Injectable()
export class AbsenService {
  constructor(
    private absenClient: PrismaAbsenService,
    private prismaService: PrismaService,
  ) {}

  async getAbsenData(filter: FilterAbsenDTO) {
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    let where = {};
    if (filter.lokasi && filter.lokasi != '') {
      where = {
        ...where,
        user: {
          sites: {
            some: {
              siteId: filter.lokasi, // Assuming `siteId` is available in User's related `sites`
            },
          },
        },
      };
    }
    if (filter.kandang && filter.kandang != '') {
    }

    if (filter.tanggal) {
      // const startOfDay = filter.tanggal
      //   ? new Date(new Date(filter.tanggal).setHours(0, 0, 0, 0))
      //   : undefined;
      // const endOfDay = filter.tanggal
      //   ? new Date(new Date(filter.tanggal).setHours(24, 0, 0, 0))
      //   : undefined;
      where = {
        ...where,
        // createdAt: {
        //   gte: startOfDay,
        //   lte: endOfDay,
        // },
        tanggal: filter.tanggal,
      };
    } else {
      where = {
        ...where,
        tanggal: today,
      };
    }

    const skip: number = ((filter.page ?? 1) - 1) * (filter.limit ?? 10);
    const take: number = filter.limit ?? 10;

    const attendance = await this.prismaService.attendance.findMany({
      where,
      include: {
        user: {
          include: {
            sites: {
              include: {
                site: true,
              },
            },
          },
        },
      },
      skip: Number(skip),
      take: Number(take),
    });

    const totalRecords = await this.prismaService.attendance.count({
      where: where,
    });

    const totalPages = Math.ceil(totalRecords / (filter.limit ?? 10));
    return {
      status: HttpStatus.OK,
      message: 'Success get attendance data',
      data: {
        data: attendance,
        meta: {
          totalRecords: totalRecords,
          currentPage: filter.page,
          totalPages: totalPages,
          pageSize: filter.limit,
        },
      },
    };
  }

  async generateDataAbsen() {
    const userAbsen = await this.absenClient.pers_person.findMany();
    const userIds: string[] = userAbsen.map((x) => x.pin ?? '');
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    const karyawan = await this.prismaService.user.findMany({
      where: {
        nip: {
          in: userIds,
        },
      },
    });

    for (const item of karyawan) {
      const cek = await this.prismaService.attendance.findFirst({
        where: {
          tanggal: today,
        },
      });
      if (!cek) {
        await this.prismaService.attendance.create({
          data: {
            name: item.fullName ?? '',
            tanggal: today,
            userId: item.id,
          },
        });
      }
    }

    return {
      status: HttpStatus.OK,
      message: 'Success save absen data',
      data: karyawan,
    };
  }

  async syncDataAbsen() {
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    const transaction = await this.absenClient.acc_transaction.findMany({
      where: {
        pin: {
          not: '',
        },
        event_time: {
          gte: new Date(`${today}T00:00:00.000Z`), // Start of the day
          lt: new Date(`${today}T23:59:59.999Z`), // Start of the next day
        },
      },
      orderBy: {
        event_time: 'desc',
      },
    });

    const groupedData = transaction.reduce((acc, transaction) => {
      const { pin, event_time } = transaction;

      if (!acc[pin!]) {
        acc[pin!] = { masuk: null, pulang: null };
      }

      // const dateTime = DateTime.fromJSDate(new Date(event_time!),{ zone: "Asia/Jakarta" });
      const dateTime = new Date(event_time!);

      const hour = event_time!.getUTCHours();
      if (hour < 12) {
        // Absen Masuk: Ambil waktu terendah
        acc[pin!].masuk = acc[pin!].masuk
          ? new Date(acc[pin!].masuk) < new Date(event_time!)
            ? acc[pin!].masuk
            : event_time
          : event_time;
      } else if (hour >= 12 && hour < 18) {
        // Absen Pulang: Ambil waktu tertinggi
        acc[pin!].pulang = acc[pin!].pulang
          ? new Date(acc[pin!].pulang) > new Date(event_time!)
            ? acc[pin!].pulang
            : event_time
          : event_time;
      }

      return acc;
    }, {});

    console.log(groupedData);
    if (groupedData) {
      const pinIndex = Object.keys(groupedData);
      for (let i of pinIndex) {
        const jamAbsen = groupedData[i];
        const jamMasuk = jamAbsen.masuk
          ? this.formatToHHmm(jamAbsen.masuk)
          : null;
        const jamPulang = jamAbsen.pulang
          ? this.formatToHHmm(jamAbsen.pulang)
          : null;
        const user = await this.prismaService.user.findFirst({
          where: { nip: i },
        });
        if (user) {
          const rows = await this.prismaService.attendance.findFirst({
            where: {
              tanggal: today,
              userId: user.id,
            },
          });
          if (rows) {
            await this.prismaService.attendance.update({
              where: {
                id: rows.id,
              },
              data: {
                jamMasuk: jamMasuk,
                jamKeluar: jamPulang,
                tanggal: today,
                timestampMasuk: jamAbsen.masuk,
                timestampKeluar: jamAbsen.pulang,
                status: jamMasuk ? 1 : 0,
              },
            });
          } else {
            await this.prismaService.attendance.create({
              data: {
                userId: user.id,
                name: user.fullName ?? '',
                jamMasuk: jamMasuk,
                jamKeluar: jamPulang,
                tanggal: today,
                timestampMasuk: jamAbsen.masuk,
                timestampKeluar: jamAbsen.pulang,
                status: jamMasuk ? 1 : 0,
              },
            });
          }
        }
      }
    }
    return {
      status: HttpStatus.OK,
      message: 'Success get absensi data',
      data: groupedData,
    };
  }

  formatToHHmm = (utcDate) => {
    const dt = utcDate.toString();
    const dateTime = DateTime.fromJSDate(new Date(utcDate!));
    // Tambahkan 7 jam untuk GMT+7

    // Format ke HH:mm
    const hours = dateTime.toUTC().hour.toString().padStart(2, '0');
    const minutes = dateTime.toUTC().minute.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
}
