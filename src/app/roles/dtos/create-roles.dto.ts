import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class RolePermission {
  @ApiPropertyOptional({
    example: 'provide id if update permission',
  })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsUUID()
  permissionId: string;
}

export class CreateRolesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    type: [RolePermission],
  })
  @IsArray()
  @ValidateNested()
  @Type(() => RolePermission)
  permissions: RolePermission[];
}
