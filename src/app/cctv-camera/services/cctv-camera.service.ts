import { Injectable } from '@nestjs/common';
import { CctvCameraRepository } from '../repositories';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { CreateCameraDTO, UpdateCameraDTO } from '../dtos';

@Injectable()
export class CctvCameraService {
  constructor(private readonly cameraRepository: CctvCameraRepository) {}

  paginate(paginateDto: PaginationQueryDto) {
    return from(this.cameraRepository.paginate(paginateDto));
  }

  detail(id: string) {
    return from(this.cameraRepository.firstOrThrow({ id }));
  }

  getByCageId(id: string) {
    return from(this.cameraRepository.getByCage(id));
  }

  update(id: string, updateCameraDTO: UpdateCameraDTO) {
    return from(this.cameraRepository.update({id}, updateCameraDTO))
  }

  destroy(id: string) {
    return from(this.cameraRepository.delete({ id }));
  }

  create(createCameraDTO: CreateCameraDTO) {
    return from(this.cameraRepository.create(createCameraDTO));
  }
}
