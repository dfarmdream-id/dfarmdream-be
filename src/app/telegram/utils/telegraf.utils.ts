import { TelegrafContext } from '@src/common/types/telegraf.type';
import { Markup } from 'telegraf';

export const sendBackToMainMenu = async (ctx: TelegrafContext) => {
  const msg = `Menu`;
  const btn = [
    { text: 'Kembali ke menu utama', callback_data: 'start', hide: false },
  ];
  const opts = {
    reply_markup: Markup.inlineKeyboard(btn, { columns: 1 }).reply_markup,
  };
  await ctx.reply(msg, opts);
  return;
};

export const sendMainMenu = async (ctx: TelegrafContext) => {
  const userFirstName = ctx.from!.first_name;
  const message = ` Hallo ${userFirstName}, saya adalah DFarm Dream Bot.\nBerikut merupakan perintah yang dapat saya lakukan:`;
  const options = {
    reply_markup: Markup.inlineKeyboard(
      [
        {
          text: 'Verifikasi Pengguna',
          callback_data: 'verifikasi',
          hide: false,
        },
      ],
      { columns: 2 },
    ).reply_markup,
  };
  await ctx.reply(message, options);
  return;
};
