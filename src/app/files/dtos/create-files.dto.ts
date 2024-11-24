import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFilesDto {
  @ApiProperty()
  public?: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    default:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAACPmIcAAAAE0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  })
  @IsString()
  file: string;

  @ApiProperty({
    example: 'image/png',
  })
  mimeType: string;
}
