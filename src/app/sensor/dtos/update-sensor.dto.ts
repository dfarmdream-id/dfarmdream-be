import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDTO } from './create-sensor.dto';

export class UpdateSensorDTO extends PartialType(CreateSensorDTO) {}
