import { Injectable } from '@nestjs/common';
import { DocumentInvestmentsRepository } from '../repositories';
import {
  CreateDocumentInvestmentsDto,
  UpdateDocumentInvestmentsDto,
} from '../dtos';
import { from } from 'rxjs';
import { Prisma } from '@prisma/client';
import { GetDocumentInvestmentDto } from '../dtos/get-document-investment.dto';

@Injectable()
export class DocumentInvestmentsService {
  constructor(
    private readonly documentinvestmentRepository: DocumentInvestmentsRepository,
  ) {}

  public paginate(paginateDto: GetDocumentInvestmentDto) {
    const where = {
      deletedAt: null,
      OR: [
        {
          name: {
            contains: paginateDto.q,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    };

    if (paginateDto.investorId) {
      Object.assign(where, {
        investor: {
          id: paginateDto.investorId,
        },
      });
    }

    return from(
      this.documentinvestmentRepository.paginate(paginateDto, {
        where: where,
        include: {
          cage: true,
          file: true,
          investor: true,
          site: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.documentinvestmentRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.documentinvestmentRepository.delete({ id }));
  }

  public create(createDocumentInvestmentsDto: CreateDocumentInvestmentsDto) {
    return from(
      this.documentinvestmentRepository.create({
        name: '',
        amount: createDocumentInvestmentsDto.amount,
        cage: {
          connect: {
            id: createDocumentInvestmentsDto.cageId,
          },
        },
        file: {
          connect: {
            id: createDocumentInvestmentsDto.fileId,
          },
        },
        investor: {
          connect: {
            id: createDocumentInvestmentsDto.investorId,
          },
        },
        site: {
          connect: {
            id: createDocumentInvestmentsDto.siteId,
          },
        },
      }),
    );
  }

  public update(
    id: string,
    updateDocumentInvestmentsDto: UpdateDocumentInvestmentsDto,
  ) {
    return from(
      this.documentinvestmentRepository.update(
        { id },
        {
          name: '',
          amount: updateDocumentInvestmentsDto.amount,
          cage: {
            connect: {
              id: updateDocumentInvestmentsDto.cageId,
            },
          },
          investor: {
            connect: {
              id: updateDocumentInvestmentsDto.investorId,
            },
          },
          file: {
            connect: {
              id: updateDocumentInvestmentsDto.fileId,
            },
          },
          site: {
            connect: {
              id: updateDocumentInvestmentsDto.siteId,
            },
          },
        },
      ),
    );
  }
}
