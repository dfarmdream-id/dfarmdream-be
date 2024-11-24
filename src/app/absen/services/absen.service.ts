import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaAbsenService } from '@src/platform/database/services/prisma-absen.service';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { FilterAbsenDTO } from '../dtos/filter-absen.dto';
import { gte, lte } from 'lodash';

@Injectable()
export class AbsenService {
  constructor(private absenClient:PrismaAbsenService, private prismaService:PrismaService) {}

  async getAbsenData(filter:FilterAbsenDTO){
    let where ={}
    if(filter.lokasi && filter.lokasi!=''){
      where = {
        ...where,
        user: {
          sites: {
            some: {
              siteId: filter.lokasi, // Assuming `siteId` is available in User's related `sites`
            },
          },
        },
      }
    }
    if(filter.kandang && filter.kandang!=''){

    }

    if(filter.tanggal){
      const startOfDay = filter.tanggal ? new Date(new Date(filter.tanggal).setHours(0, 0, 0, 0)) : undefined;
      const endOfDay = filter.tanggal ? new Date(new Date(filter.tanggal).setHours(24, 0, 0, 0)) : undefined;
      where = {
        ...where,
        tanggal: {
          gte:startOfDay,
          lte:endOfDay
        },
      }
    }

    const skip:number = ((filter.page??1) - 1) * (filter.limit??10);
    const take:number = filter.limit??10;

    const attendance = await this.prismaService.attendance.findMany({where, include:{
      user:true
    },
    skip: Number(skip),
    take: Number(take),
  })

  const totalRecords = await this.prismaService.attendance.count({
    where: where,
  });

  const totalPages = Math.ceil(totalRecords / (filter.limit??10));
    return {
      status:HttpStatus.OK,
      message:"Success get attendance data",
      data: {
        data: attendance,
        meta:{
            totalRecords: totalRecords,
            currentPage: filter.page,
            totalPages: totalPages,
            pageSize: filter.limit,
        }
      }
      
    }
  }
  
  async syncDataAbsen(){
    const transaction = await this.absenClient.acc_transaction.findMany({
      where: {
        pin: {
          not: "",
        },
        event_time: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of the day
          lt: new Date(new Date().setHours(24, 0, 0, 0)), // Start of the next day
        },
      },
    })
    for(let item of transaction){
      const person = await this.absenClient.pers_personnallist_person.findFirst({
        where:{
          person_pin: item.pin
        }
      })
      if(person){
        console.log(person.person_name)
      }
    }
    return {
      status:HttpStatus.OK,
      message:"Success get absensi data",
      data: transaction
    }
  }
}
