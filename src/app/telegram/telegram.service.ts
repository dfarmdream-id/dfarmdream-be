import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services';

@Injectable()
export class TelegramService {
  constructor(private readonly userService: UsersService) {}

  async generateTelegramToken(nik: string) {
    const models = await this.userService.generateToken(nik);
    return models;
  }

  async validasiTelegramToken(
    username: string,
    token: string,
    telegramId: string,
    telegramUsername: string,
  ) {
    const models = await this.userService.validationTOken(
      username,
      token,
      telegramId,
      telegramUsername,
    );
    return models;
  }
}
