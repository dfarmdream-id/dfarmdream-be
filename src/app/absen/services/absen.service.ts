import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaAbsenService } from '@src/platform/database/services/prisma-absen.service';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { FilterAbsenDTO } from '../dtos/filter-absen.dto';
import { DateTime } from 'luxon';
import moment from 'moment';
import { Prisma } from '@prisma/client';

@Injectable()
export class AbsenService {
  constructor(
    private absenClient: PrismaAbsenService,
    private prismaService: PrismaService,
  ) {}

  async getAbsenData(filter: FilterAbsenDTO, siteId: string) {
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    let where = {};
    where = {
      ...where,
      user: {
        sites: {
          some: {
            siteId: filter.lokasi ?? siteId, // Assuming `siteId` is available in User's related `sites`
          },
        },
      },
    };

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

    if (filter.kandang) {
      where = {
        ...where,
        user: {
          AttendanceLog: {
            some: {
              cageId: filter.kandang,
            },
          },
        },
      };
    }

    if (filter.lokasi) {
      where = {
        ...where,
        user: {
          sites: {
            some: {
              siteId: filter.lokasi,
            },
          },
        },
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
    const userIds: string[] = userAbsen
      .filter((x) => x.pin != '')
      .map((x) => x.pin!);
    const today = DateTime.now().toFormat('yyyy-MM-dd');
    const karyawan = await this.prismaService.user.findMany({
      where: {
        identityId: {
          in: userIds,
        },
      },
    });

    for (const item of karyawan) {
      const cek = await this.prismaService.attendance.findFirst({
        where: {
          tanggal: today,
          userId: item.id,
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
      // const dateTime = new Date(event_time!);

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

    // console.log(groupedData);
    if (groupedData) {
      const pinIndex = Object.keys(groupedData);
      for (const i of pinIndex) {
        const jamAbsen = groupedData[i];
        const jamMasuk = jamAbsen.masuk
          ? this.formatToHHmm(jamAbsen.masuk)
          : null;
        const jamPulang = jamAbsen.pulang
          ? this.formatToHHmm(jamAbsen.pulang)
          : null;
        const user = await this.prismaService.user.findFirst({
          where: { identityId: i },
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

  async syncAttendanceLog() {
    let where = {};
    where = {
      pin: {
        not: '',
      },
    };
    try {
      const latestData = await this.prismaService.attendanceLog.findFirst({
        orderBy: {
          checkInAt: 'desc',
        },
      });
      if (latestData) {
        where = {
          ...where,
          event_time: {
            gt: latestData.checkInAt,
          },
        };
        // console.log('lastCheckInAt', latestData.checkInAt);
      }

      const listAccTransaction =
        await this.absenClient.acc_transaction.findMany({
          where,
        });
      // console.log('count', listAccTransaction.length);
      if (listAccTransaction.length == 0) return;

      for (const item of listAccTransaction) {
        try {
          const user = await this.prismaService.user.findFirstOrThrow({
            where: {
              identityId: item.pin,
            },
            include: {
              sites: true,
              cages: true,
            },
          });
          const tgl = this.throwIfNull(item.event_time);
          await this.prismaService.attendanceLog.create({
            data: {
              userId: user.id,
              siteId: user.sites[0].siteId,
              cageId: user.cages[0].cageId,
              checkInAt: tgl,
              tanggal: moment(tgl).format('YYYY-MM-DD'),
            },
          });
        } catch (e) {
          console.error(e instanceof Error ? e.message : (e as string));
          continue;
        }
      }
    } catch (e) {
      console.error(e instanceof Error ? e.message : (e as string));
    }
  }

  async getAttendanceLog(filter: FilterAbsenDTO, siteId: string) {
    let where = {};
    let queryWhere = `WHERE alg."siteId" = '${filter.lokasi ?? siteId}'`;
    where = {
      user: {
        sites: {
          some: {
            siteId: filter.lokasi ?? siteId,
          },
        },
      },
    };

    if (filter.tanggal) {
      where = {
        ...where,
        tanggal: filter.tanggal,
      };
      queryWhere += ` AND tanggal = ${filter.tanggal}`;
    }

    if (filter.search) {
      where = {
        ...where,
        OR: [
          {
            user: {
              fullName: { contains: filter.search, mode: 'insensitive' },
            },
          },
          { cage: { name: { contains: filter.search, mode: 'insensitive' } } },
          { site: { name: { contains: filter.search, mode: 'insensitive' } } },
        ],
      };
    }

    if (filter.tanggal) {
      where = {
        ...where,
        tanggal: filter.tanggal,
      };

      queryWhere = ` AND tanggal = '${filter.tanggal}' `;
    }

    if (filter.kandang) {
      where = {
        ...where,
        cageId: filter.kandang,
      };

      queryWhere += ` AND c."id" = '${filter.kandang}' `;
    }

    if (filter.lokasi) {
      where = {
        ...where,
        siteId: filter.lokasi,
      };

      queryWhere += ` AND s."id" = '${filter.lokasi}' `;
    }

    const skip: number = ((filter.page ?? 1) - 1) * (filter.limit ?? 10);
    const take: number = filter.limit ?? 10;

    const listData = await this.prismaService.attendanceLog.findMany({
      skip: Number(skip),
      take: Number(take),
      include:{
        user:true,
        cage:true,
        site:true
      },
      where: where,
      orderBy: {
        checkInAt: 'desc',
      },
    });
    const totalRecords = await this.prismaService.attendanceLog.count({
      where,
    });
    const totalPages = Math.ceil(totalRecords / (filter.limit ?? 10));
    return {
      status: HttpStatus.OK,
      message: 'Success get attendance log data',
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

  formatToHHmm = (utcDate) => {
    // const dt = utcDate.toString();
    const dateTime = DateTime.fromJSDate(new Date(utcDate!));
    // Tambahkan 7 jam untuk GMT+7

    // Format ke HH:mm
    const hours = dateTime.toUTC().hour.toString().padStart(2, '0');
    const minutes = dateTime.toUTC().minute.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  throwIfNull(value: Date | null) {
    if (!value) throw new Error('value is null');
    return value;
  }
}
