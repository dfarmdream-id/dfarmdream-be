import { Controller } from '@nestjs/common';
import { CashFlowsRepository } from 'src/app/cash-flows/repositories';
import { CashFlowsService } from 'src/app/cash-flows/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CashFlows')
@Controller({
  path: 'cashflow',
  version: '1',
})
export class CashFlowsMicroserviceController {
  constructor(
    private readonly cashflowService: CashFlowsService,
    private readonly cashflowRepository: CashFlowsRepository,
  ) {}
}
