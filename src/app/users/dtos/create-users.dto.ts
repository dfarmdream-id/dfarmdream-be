import { ApiProperty } from '@nestjs/swagger';
import { Cage, UserStatus } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
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

class Cages {
  @ApiProperty()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsUUID()
  cageId: string;
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

  @ApiProperty({
    example: [Cages],
  })
  @IsArray()
  cages: Cages[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsEnum(UserStatus)
  status: `${UserStatus}`;

  @ApiProperty()
  @IsString()
  @IsOptional()
  identityId: string;

  @ApiProperty()
  @IsOptional()
  imageId?: string;
}
