import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateChickenDiseasesDto {
  @ApiProperty({
    description: 'The name of the chicken disease',
    example: 'Newcastle Disease',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the disease',
    example: 'A contagious viral disease that affects chickens.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Symptoms caused by the disease',
    example: 'Coughing, diarrhea, lethargy',
    required: false,
  })
  @IsOptional()
  @IsString()
  symptoms?: string;

  @ApiProperty({
    description: 'Treatment or remedies for the disease',
    example: 'Vaccination, disinfecting environment',
    required: false,
  })
  @IsOptional()
  @IsString()
  treatment?: string;
}
