import { Injectable } from '@nestjs/common';
import { DocumentInvestmentsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import {
  CreateDocumentInvestmentsDto,
  UpdateDocumentInvestmentsDto,
} from '../dtos';
import { from } from 'rxjs';
import { FilterDokumenDTO } from '../dtos/filter-dokumen.dto';

@Injectable()
export class DocumentInvestmentsService {
  constructor(
    private readonly documentinvestmentRepository: DocumentInvestmentsRepository,
  ) {}

  public paginate(paginateDto: FilterDokumenDTO) {
    let where:any = {deletedAt:null}
    if(paginateDto.investorId){
      where = {
        ...where,
        investorId:paginateDto.investorId
      }
    }
    return from(
      this.documentinvestmentRepository.paginate(paginateDto, {
        where: {
         ...where
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.documentinvestmentRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    console.log("Id : ", id)
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
