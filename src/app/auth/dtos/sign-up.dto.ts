import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUsersDto } from 'src/app/users/dtos';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignUpDto extends CreateUsersDto {
  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
