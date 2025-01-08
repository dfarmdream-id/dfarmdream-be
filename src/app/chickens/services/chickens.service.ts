import { Injectable, NotFoundException } from '@nestjs/common';
import { ChickensRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateChickensDto, UpdateChickensDto } from '../dtos';
import { from, map } from 'rxjs';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

@Injectable()
export class ChickensService {
  constructor(private readonly chickenRepository: ChickensRepository) {}

  public paginate(
    paginateDto: PaginationQueryDto,
    siteId: string,
    rackId?: string | null,
    batchId?: string | null,
    cageId?: string | null,
    dateRange?: string | null,
    status?: string | null,
    diseaseId?: string | null,
  ) {
    const { q } = paginateDto;

    // Filter `OR` conditions dynamically
    const searchConditions: Prisma.ChickenWhereInput[] = [];

    if (q) {
      searchConditions.push(
        { name: { contains: q, mode: 'insensitive' } }, // Pencarian pada kolom `name`
        { rack: { name: { contains: q, mode: 'insensitive' } } }, // Pencarian pada `rack.name`
        { rack: { cage: { name: { contains: q, mode: 'insensitive' } } } }, // Pencarian pada `cage.name`
      );
    }

    const where: Prisma.ChickenWhereInput = {
      deletedAt: null,
      rack: {
        ...(rackId && { id: rackId }),
        cage: {
          siteId,
          ...(cageId && { id: cageId }),
        },
      },
      batch: {
        ...(batchId && { id: batchId }),
      },
      ...(dateRange && {
        updatedAt: {
          gte: DateTime.fromISO(dateRange.split(',')[0]).toJSDate(),
          lte: DateTime.fromISO(dateRange.split(',')[1]).toJSDate(),
        },
      }),
      ...(status && { status: status as any }),
      disease: {
        ...(diseaseId && { id: diseaseId }),
      },
      ...(searchConditions.length > 0 && { OR: searchConditions }), // Tambahkan kondisi `OR` jika ada
    };

    return from(
      this.chickenRepository.paginate(paginateDto, {
        where,
        include: {
          batch: true,
          rack: {
            include: {
              cage: true,
            },
          },
          disease: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.chickenRepository
        .find({
          where: { id },
          include: {
            batch: true,
            rack: {
              include: {
                cage: {
                  include: {
                    site: true,
                  },
                },
              },
            },
            disease: true,
          },
        })
        .pipe(
          map((data) => {
            if (!data) {
              throw new NotFoundException('Data tidak ditemukan');
            }

            return data[0];
          }),
        ),
    );
  }

  public destroy(id: string) {
    return from(this.chickenRepository.delete({ id }));
  }

  public create(createChickensDto: CreateChickensDto) {
    const racks = createChickensDto.rackId.split(',');
    const data = racks.map((rackId) => ({
      ...createChickensDto,
      rackId,
    }));

    return from(this.chickenRepository.createMany(data));
  }

  public update(id: string, updateChickensDto: UpdateChickensDto) {
    // Hilangkan rackId dan ubah menjadi format connect
    const updatedData = {
      ...updateChickensDto,
      rack: updateChickensDto.rackId
        ? { connect: { id: updateChickensDto.rackId } }
        : undefined, // Jika tidak ada rackId, jangan tambahkan properti rack
      batch: updateChickensDto.batchId
        ? { connect: { id: updateChickensDto.batchId } }
        : undefined, // Jika tidak ada batchId, jangan tambahkan properti batch
      disease: updateChickensDto.diseaseIds
        ? { connect: { id: updateChickensDto.diseaseIds } }
        : undefined, // Jika tidak ada diseaseId, jangan tambahkan properti disease
    };

    // Hapus rackId dari objek agar tidak ikut terupdate
    delete updatedData.rackId;
    delete updatedData.batchId;
    delete updatedData.diseaseIds;

    return from(this.chickenRepository.update({ id }, updatedData));
  }
}
