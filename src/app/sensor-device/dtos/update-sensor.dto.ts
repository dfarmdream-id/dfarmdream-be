import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDevice } from './create-sensor-device.dto';

export class UpdateSensorDevice extends PartialType(CreateSensorDevice) {}
