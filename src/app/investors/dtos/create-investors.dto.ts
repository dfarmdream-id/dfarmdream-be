import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

class UserRole {
  @ApiProperty({
    example: 'provide id if update',
  })
  id: string;

  @ApiProperty()
  roleId: string;
}

export class CreateInvestorsDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  identityId?: string;

  @ApiProperty({
    type: [UserRole],
  })
  @IsArray()
  roles: UserRole[];
}
