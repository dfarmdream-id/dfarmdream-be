import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AbsenService } from '../../services';
import { FilterAbsenDTO } from '../../dtos/filter-absen.dto';

@ApiSecurity('JWT')
@ApiTags('Absen')
@Controller({
  path: 'absen',
  version: '1',
})
export class AbsenHttpController {
  constructor(private absenService:AbsenService) {}

  @Get('/')
  getAllAbsen(@Query() query:FilterAbsenDTO){
    return this.absenService.getAbsenData(query)
  }

  @Get('/sync-absen')
  syncDataAbsen(){
    return this.absenService.syncDataAbsen()
  }

  @Get('/generate-absen')
  generateAbsen(){
    return this.absenService.generateDataAbsen()
  }
}
