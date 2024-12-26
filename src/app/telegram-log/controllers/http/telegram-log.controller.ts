import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth';
import { User } from '@app/auth/decorators';
import { JWTClaim } from '@app/auth/entity/jwt-claim.dto';
import { TelegramLogService } from '../../services/telegram-log.service';
import { FilterLogDTO } from '../../dtos';

@ApiSecurity('JWT')
@ApiTags('Telegram Log')
@Controller({
  path: 'telegram-log',
  version: '1',
})
export class TelegramLogHttpController {
  constructor(private service: TelegramLogService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getAllAbsen(@Query() query: FilterLogDTO, @User() { siteId }: JWTClaim) {
    return this.service.getTelegramLog(query, siteId);
  }
}
