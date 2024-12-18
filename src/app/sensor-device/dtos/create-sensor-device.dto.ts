import { ApiProperty } from '@nestjs/swagger';
import { SensorType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDevice {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({
    enum: SensorType,
  })
  @IsString()
  @IsEnum(SensorType)
  type: 'TEMP' | 'HUMIDITY' | 'GAS' | 'LDR';

  @ApiProperty()
  @IsString()
  deviceId: string;
}
