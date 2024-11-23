import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDTO } from './create-camera.dto';

export class UpdateCameraDTO extends PartialType(CreateCameraDTO) {}
