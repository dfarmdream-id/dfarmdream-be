import { Injectable } from '@nestjs/common';
import { DocumentInvestmentsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateDocumentInvestmentsDto,
  UpdateDocumentInvestmentsDto,
} from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class DocumentInvestmentsService {
  constructor(
    private readonly documentinvestmentRepository: DocumentInvestmentsRepository,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.documentinvestmentRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.documentinvestmentRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.documentinvestmentRepository.delete({ id }));
  }

  public create(createDocumentInvestmentsDto: CreateDocumentInvestmentsDto) {
    return from(
      this.documentinvestmentRepository.create(createDocumentInvestmentsDto),
    );
  }

  public update(
    id: string,
    updateDocumentInvestmentsDto: UpdateDocumentInvestmentsDto,
  ) {
    return from(
      this.documentinvestmentRepository.update(
        { id },
        updateDocumentInvestmentsDto,
      ),
    );
  }
}
