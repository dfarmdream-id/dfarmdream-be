import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SignUpDto {
  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  @Matches(/^[a-zA-Z0-9 -]*$/)
  fullName: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('validation.email'),
    },
  )
  email: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
