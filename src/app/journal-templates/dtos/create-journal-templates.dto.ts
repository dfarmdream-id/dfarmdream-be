import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateJournalTemplateDetailsDto } from '@app/journal-templates/dtos/create-journal-template-details.dto';

export class CreateJournalTemplatesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  journalTypeId: string;

  @ApiProperty({
    description: 'Array of journal details',
    type: [CreateJournalTemplateDetailsDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalTemplateDetailsDto)
  details: CreateJournalTemplateDetailsDto[];
}
