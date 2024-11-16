import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

class UserRole {
  @ApiProperty({
    example: 'provide id if update',
  })
  id: string;

  @ApiProperty()
  roleId: string;
}

class Sites {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsUUID()
  siteId: string;
}

export class CreateUsersDto {
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
  @IsString({
    message: i18nValidationMessage('validation.string'),
  })
  password: string;

  @ApiProperty({
    type: [UserRole],
  })
  @IsArray()
  roles: UserRole[];

  @ApiProperty()
  @IsUUID()
  positionId: string;

  @ApiProperty({
    example: [Sites],
  })
  @IsArray()
  sites: Sites[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;
}
