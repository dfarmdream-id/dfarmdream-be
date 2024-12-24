import { Injectable } from '@nestjs/common';
import { BatchesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateBatchesDto, UpdateBatchesDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class BatchesService {
  constructor(private readonly batchRepository: BatchesRepository) {}

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    return from(
      this.batchRepository.paginate(paginateDto, {
        where: {
          siteId,
        },
        include: {
          site: true,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.batchRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.batchRepository.delete({ id }));
  }

  public create(createBatchesDto: CreateBatchesDto) {
    return from(
      this.batchRepository.create({
        ...createBatchesDto,
        site: {
          connect: { id: createBatchesDto.siteId },
        },
      }),
    );
  }

  public update(id: string, updateBatchesDto: UpdateBatchesDto) {
    return from(this.batchRepository.update({ id }, updateBatchesDto));
  }
}
