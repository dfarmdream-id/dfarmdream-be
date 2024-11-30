import { Action, Ctx, Start, Update } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';
import { TelegrafContext } from '@src/common/types/telegraf.type';
import { REGISTER_WIZARD } from './constants';
import { sendMainMenu } from './utils';

@Update()
export class TelegramUpdate {
  constructor(private readonly service: TelegramService) {}
  @Start()
  async onStart(@Ctx() ctx: TelegrafContext): Promise<void> {
    await sendMainMenu(ctx);
  }

  @Action('verifikasi')
  async onWizardCommand(@Ctx() ctx: TelegrafContext): Promise<void> {
    await ctx.scene.enter(REGISTER_WIZARD);
  }

  @Action('start')
  async onLeaveCommand(@Ctx() ctx: TelegrafContext): Promise<void> {
    await sendMainMenu(ctx);
  }
}
