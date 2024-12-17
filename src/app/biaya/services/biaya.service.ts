import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { BiayaRepository } from '../repositories';
import { CreateBiayaDTO, UpdateBiayaDTO } from '../dtos';
import { PrismaService } from '@src/platform/database/services/prisma.service';

@Injectable()
export class BiayaService {
  constructor(
    private readonly biayaRepository: BiayaRepository,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: PaginationQueryDto, siteId: string) {
    return from(
      this.biayaRepository.paginate(paginateDto, { where: { siteId } }),
    );
  }

  detail(id: string) {
    return from(this.biayaRepository.firstOrThrow({ id }));
  }

  update(id: string, UpdateBiayaDTO: UpdateBiayaDTO) {
    return from(this.biayaRepository.update({ id }, UpdateBiayaDTO));
  }

  destroy(id: string) {
    return from(this.biayaRepository.delete({ id }));
  }

  async create(payload: CreateBiayaDTO) {
    try {
      const saved = await this.prismaService.biaya.create({
        data: {
          tanggal: payload.tanggal,
          kategoriBiaya: {
            connect: { id: payload.kategoriId },
          },
          cage: {
            connect: { id: payload.cageId },
          },
          site: {
            connect: { id: payload.siteId },
          },
          goods: {
            connect: { id: payload.goodsId },
          },
          user: {
            connect: { id: payload.userId },
          },
          biaya: payload.biaya,
          status: payload.status,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Success create biaya',
        data: saved,
      };
    } catch (e) {
      console.log('Failed to create biaya : ', e);
      throw new HttpException('Failed to create biaya', HttpStatus.BAD_REQUEST);
    }
  }
}
