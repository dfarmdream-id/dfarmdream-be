import { Injectable } from '@nestjs/common';
import { SitesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateSitesDto, UpdateSitesDto } from '../dtos';
import { from, Observable } from 'rxjs';

@Injectable()
export class SitesService {
  constructor(private readonly siteRepository: SitesRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.siteRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.siteRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.siteRepository.delete({ id }));
  }

  public create(createSitesDto: CreateSitesDto) {
    return from(this.siteRepository.create(createSitesDto));
  }

  public update(id: string, updateSitesDto: UpdateSitesDto) {
    return from(this.siteRepository.update({ id }, updateSitesDto));
  }
}

