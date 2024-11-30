import { Wizard, WizardStep, Ctx, On, Message, Command } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { TelegramService } from '../telegram.service';
import { REGISTER_WIZARD } from '../constants';
type WizardContext = Scenes.WizardContext;

@Wizard(REGISTER_WIZARD)
export class RegisterWizard {
  constructor(private readonly service: TelegramService) {}

  @WizardStep(1)
  async onSceneEnter(@Ctx() ctx: WizardContext): Promise<string> {
    await ctx.wizard.next();
    return 'Hallo untuk dapat melanjutkan, silakan kirimkan USERNAME anda yang terdaftar di aplikasi DFARM DREAM :';
  }

  @On('text')
  @WizardStep(2)
  async onNik(@Ctx() ctx: WizardContext, @Message() msg: { text: string }) {
    const nik = msg.text;
    ctx.reply('Mohon tunggu kami lakukan verifikasi dulu ya..');
    try {
      const user = await this.service.generateTelegramToken(nik);

      if (!user) {
        ctx.reply(
          'Silakan coba kembali atau ketikkan /cancel untuk membatalkan proses verifikasi akun',
        );
        const currentStepIndex = ctx.wizard.cursor;
        return ctx.wizard.selectStep(currentStepIndex);
      }

      ctx.wizard.state['username'] = user.username;
      ctx.wizard.state['fullName'] = user.fullName;
      ctx.reply(
        `HI ${user.fullName}, untuk dapat melanjutkan proses verifikasi silakan login ke aplikasi DFARM DREAM kemudian kirimkan kode verifikasi yang terdapat pada halaman profile ya!`,
      );
      ctx.wizard.next();
      return;
    } catch (e) {
      console.log(e);
      ctx.reply(
        `Mohon maaf, proses verifikasi tidak dapat kami lanjutkan karena saat ini terdapat gangguan pada server aplikasi, silakan kirimkan command /start untuk memulai kembali`,
      );
      return ctx.scene.leave();
    }
  }

  @On('text')
  @WizardStep(3)
  async onLocation(
    @Ctx()
    ctx: WizardContext & {
      wizard: { state: { username: string; fullName: string } };
    },
    @Message() msg: { text: string },
  ) {
    const username = ctx.wizard.state.username;
    const text = msg.text;
    ctx.reply(`Baik kak ${ctx.wizard.state.fullName} kami cek dulu ya..`);
    try {
      const user = await this.service.validasiTelegramToken(
        username,
        text,
        ctx.message!.from.id.toString(),
        ctx.message!.from.username!,
      );

      if (!user) {
        ctx.reply(
          'Silakan coba kembali atau ketikkan /cancel untuk membatalkan proses verifikasi akun',
        );
        const currentStepIndex = ctx.wizard.cursor;
        ctx.wizard.selectStep(currentStepIndex);
        return;
      }

      ctx.reply(
        `Hi Kak ${user.fullName}, proses verifikasi telah berhasil, sekarang akun telegram ini sudah tertaut dengan akun DFARM DREAM kakak, dan kakak akan mendapatkan berbagai notifikasi dari aplikasi DFARM DREAM\n\nUntuk dapat melihat menu silakan ketikkan command /start`,
      );
      ctx.scene.leave();
      return;
    } catch (e) {
      console.log(e);
      ctx.reply(
        `Mohon maaf, proses verifikasi tidak dapat kami lanjutkan karena saat ini terdapat gangguan pada server aplikasi, silakan kirimkan command /start untuk memulai kembali`,
      );
      ctx.scene.leave();
      return;
    }
  }

  @Command('cancel')
  async onLeaveCommand(@Ctx() ctx: WizardContext): Promise<void> {
    await ctx.scene.leave();
  }
}
