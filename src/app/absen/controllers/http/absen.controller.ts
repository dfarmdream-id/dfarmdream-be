import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AbsenService } from '../../services';
import { FilterAbsenDTO } from '../../dtos/filter-absen.dto';
import { AuthGuard } from '@app/auth';
import { User } from '@app/auth/decorators';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';

@ApiSecurity('JWT')
@ApiTags('Absen')
@Controller({
  path: 'absen',
  version: '1',
})
export class AbsenHttpController {
  constructor(private absenService: AbsenService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getAllAbsen(@Query() query: FilterAbsenDTO, @User() { siteId }: JWTClaim) {
    return this.absenService.getAbsenData(query, siteId);
  }

  @UseGuards(AuthGuard)
  @Get('/log')
  getAllLog(@Query() query: FilterAbsenDTO, @User() { siteId }: JWTClaim) {
    return this.absenService.getAttendanceLog(query, siteId);
  }

  @Get('/sync-absen')
  syncDataAbsen() {
    return this.absenService.syncDataAbsen();
  }

  @Get('/sync-log')
  syncAttendaceLog() {
    return this.absenService.syncAttendanceLog();
  }

  @Get('/generate-absen')
  generateAbsen() {
    return this.absenService.generateDataAbsen();
  }
}
