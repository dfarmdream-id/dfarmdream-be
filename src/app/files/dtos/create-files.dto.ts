import { ApiProperty } from '@nestjs/swagger';

export class CreateFilesDto {
  @ApiProperty()
  url?: string | null | undefined;

  @ApiProperty()
  public?: boolean | undefined;

  @ApiProperty()
  name: string;

  @ApiProperty()
  file: Buffer;

  @ApiProperty()
  mimeType: string;
}
