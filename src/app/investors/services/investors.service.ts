import { Injectable } from '@nestjs/common';
import { InvestorsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateInvestorsDto, UpdateInvestorsDto } from '../dtos';
import { from } from 'rxjs';
import { hashSync } from '@node-rs/bcrypt';

@Injectable()
export class InvestorsService {
  constructor(private readonly investorRepository: InvestorsRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.investorRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
        },
      }),
    );
  }

  public detail(id: string) {
    return from(this.investorRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.investorRepository.delete({ id }));
  }

  public create(createInvestorsDto: CreateInvestorsDto) {
    return from(
      this.investorRepository.create({
        ...createInvestorsDto,
        password: hashSync(createInvestorsDto.password),
      }),
    );
  }

  public update(id: string, updateInvestorsDto: UpdateInvestorsDto) {
    return from(this.investorRepository.update({ id }, updateInvestorsDto));
  }
}
