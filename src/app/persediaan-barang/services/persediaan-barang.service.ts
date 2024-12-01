import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { PersediaanBarangRepository } from '../repositories';
import { CreatePersediaanBarang, UpdatePersediaanBarangDTO } from '../dtos';
import { FilterPersediaanBarangDTO } from '../dtos/filter-persediaan-barang.dto';
import { TipeBarang } from '@prisma/client';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { DateTime } from 'luxon'
import { TransaksiBarangDTO } from '../dtos/transaksi.dto';
import { FilterTransaksiBarangDTO } from '../dtos/filter-transaksi-barang.dto';
@Injectable()
export class PersediaanBarangService {
  constructor(
    private readonly persediaanBarangRepo: PersediaanBarangRepository,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: FilterPersediaanBarangDTO) {
    return from(this.persediaanBarangRepo.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.persediaanBarangRepo.firstOrThrow({ id }));
  }

  async update(id: string, payload: UpdatePersediaanBarangDTO, user: { as: 'user' | 'investor'; id: string } & { siteId: string }) {
    try{
      const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
      const updated = await this.prismaService.persediaanPakanObat.update({ where:{
        id:id
      }, data:{
        qty: payload.qty,
        cageId: payload.cageId,
        siteId: payload.siteId,
        harga: payload.harga,
        total: payload.harga! * payload.qty!,
        status: 1,
        tipeBarang: TipeBarang[payload.tipeBarang!]
      }});

      const kartuStok = await this.prismaService.kartuStokBarang.create({
        data:{
          barangId: id,
          cageId: payload.cageId!,
          siteId: payload.siteId!,
          qtyAsal:payload.qty!,
          qtyIn: 0,
          qtyAkhir:payload.qty!,
          qtyOut:0,
          keterangan:"Create Barang",
          karyawanId: user.id,
          tanggal: currentDate,
          harga: payload.harga!,
          total: payload.qty! * payload.harga!,
          status:1
        }
      })

      return {
        status:HttpStatus.OK,
        message:"Success create persediaan barang",
        data:kartuStok
      }

    }catch(e){
      throw new HttpException("Failed to update persediaan barang", HttpStatus.BAD_REQUEST)
    }
  }

  destroy(id: string) {
    return from(this.persediaanBarangRepo.delete({ id }));
  }

  async create(payload: CreatePersediaanBarang, user: { as: 'user' | 'investor'; id: string } & { siteId: string }) {
    try {
      const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
      const save = await this.prismaService.persediaanPakanObat.create({
        data: {
          namaBarang: payload.namaBarang,
          qty: payload.qty,
          cageId: payload.cageId,
          siteId: payload.siteId,
          harga: payload.harga,
          total: payload.harga * payload.qty,
          status: 1,
          tipeBarang: TipeBarang[payload.tipeBarang],
        },
      });

      // Save ke kartustok
      const kartuStok = await this.prismaService.kartuStokBarang.create({
        data:{
          barangId: save.id,
          cageId: payload.cageId,
          siteId: payload.siteId,
          qtyAsal:payload.qty,
          qtyIn: 0,
          qtyAkhir:payload.qty,
          qtyOut:0,
          keterangan:"Create Barang",
          karyawanId: user.id,
          tanggal: currentDate,
          harga: payload.harga,
          total: payload.qty * payload.harga
        }
      })
      return {
        status: HttpStatus.OK,
        message:"Success create persediaan barang",
        data:{
          barang: save,
          stok: kartuStok
        }
      }
    } catch (e) {
      throw new HttpException(
        'Failed to create persediaan barang',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async submitTransaksi(body:TransaksiBarangDTO, user: { as: 'user' | 'investor'; id: string } & { siteId: string }){
    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const barang = await this.prismaService.persediaanPakanObat.findFirst({where:{
      id: body.barangId
    }})
    if(!barang){
      throw new HttpException("Failed to save transaction, barang tidak ditemukan", HttpStatus.BAD_REQUEST)
    }
    try{
      if(body.tipe=='in'){
        await this.prismaService.kartuStokBarang.create({
          data:{
            tanggal:currentDate,
            barangId: barang.id,
            cageId: body.cageId,
            siteId: body.siteId,
            qtyAsal: barang.qty,
            qtyIn: body.qty,
            qtyOut:0,
            qtyAkhir: barang.qty + body.qty,
            harga: barang.harga,
            total: barang.harga * body.qty,
            karyawanId: user.id,
            keterangan:body.keterangan,
            status:1
          }
        })
        // Update stok
        await this.prismaService.persediaanPakanObat.update({where:{id:barang.id}, data:{
          qty: barang.qty + body.qty
        }})
      }else{
        await this.prismaService.kartuStokBarang.create({
          data:{
            tanggal:currentDate,
            barangId: barang.id,
            cageId: body.cageId,
            siteId: body.siteId,
            qtyAsal: barang.qty,
            qtyIn: 0,
            qtyOut:body.qty,
            qtyAkhir: barang.qty - body.qty,
            harga: barang.harga,
            total: barang.harga * body.qty,
            karyawanId: user.id,
            keterangan: body.keterangan,
            status:0
          }
        })

        await this.prismaService.persediaanPakanObat.update({where:{id:barang.id}, data:{
          qty: barang.qty - body.qty
        }})
      }
      return {
        status:HttpStatus.OK,
        message:"Success save transaction",
        data:[]
      }
    }catch(e){
      throw new HttpException("Failed to submit data transaksi", HttpStatus.BAD_REQUEST)
    }
  }

  paginateTransaksi(paginateDto: FilterTransaksiBarangDTO) {
    return from(this.persediaanBarangRepo.paginateTransaksi(paginateDto));
  }
}
