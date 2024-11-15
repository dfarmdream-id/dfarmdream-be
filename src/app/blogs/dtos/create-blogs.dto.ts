import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateBlogsDto implements Partial<Prisma.BlogCreateInput> {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty({
    example:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAACPmIcAAAAE0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=',
  })
  @IsString()
  image: string;
}
