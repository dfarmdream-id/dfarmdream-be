import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WarehouseTransactions')
@Controller({
  path: 'warehousetransaction',
  version: '1',
})
export class WarehouseTransactionsMicroserviceController {}
