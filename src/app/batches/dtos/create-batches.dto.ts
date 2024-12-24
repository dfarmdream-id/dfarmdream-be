import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum BatchStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED',
}

export class CreateBatchesDto {
  @ApiProperty({
    description: 'Name of the batch',
    example: 'Batch 1 January 2024',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Start date of the batch',
    example: '2024-01-01T00:00:00Z',
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the batch (optional)',
    example: '2024-06-30T00:00:00Z',
    required: false,
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({
    description: 'Status of the batch',
    enum: BatchStatus,
    default: BatchStatus.ONGOING,
  })
  @IsEnum(BatchStatus)
  @IsOptional()
  status: BatchStatus = BatchStatus.ONGOING;

  @ApiProperty({
    description: 'ID of the site associated with the batch',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  siteId: string;
}
