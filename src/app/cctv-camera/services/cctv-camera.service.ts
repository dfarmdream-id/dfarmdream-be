import { Injectable } from '@nestjs/common';
import { CctvCameraRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateCameraDTO, UpdateCameraDTO } from '../dtos';
import { PrismaService } from 'src/platform/database/services/prisma.service';

@Injectable()
export class CctvCameraService {
  constructor(
    private readonly cameraRepository: CctvCameraRepository,
    private readonly prismaService: PrismaService,
  ) {}

  paginate(paginateDto: PaginationQueryDto, siteId: string) {
    return from(
      this.cameraRepository.paginate(paginateDto, {
        where: {
          cage: {
            siteId,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  detail(id: string) {
    return from(this.cameraRepository.firstOrThrow({ id }));
  }

  getByCageId(id: string) {
    return from(this.cameraRepository.getByCage(id));
  }

  update(id: string, updateCameraDTO: UpdateCameraDTO) {
    return from(this.cameraRepository.update({ id }, updateCameraDTO));
  }

  destroy(id: string) {
    return from(this.cameraRepository.delete({ id }));
  }

  create(createCameraDTO: CreateCameraDTO) {
    return from(this.cameraRepository.create(createCameraDTO));
  }
}
