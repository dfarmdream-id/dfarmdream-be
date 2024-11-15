import { Injectable } from '@nestjs/common';
import { FaqsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateFaqsDto, UpdateFaqsDto } from '../dtos';
import { from } from 'rxjs';

@Injectable()
export class FaqsService {
  constructor(private readonly faqRepository: FaqsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.faqRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.faqRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.faqRepository.delete({ id }));
  }

  public create(createFaqsDto: CreateFaqsDto, userId?: string) {
    return from(
      this.faqRepository.create({
        answer: createFaqsDto.answer,
        question: createFaqsDto.question,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      }),
    );
  }

  public update(id: string, updateFaqsDto: UpdateFaqsDto) {
    return from(this.faqRepository.update({ id }, updateFaqsDto));
  }
}
