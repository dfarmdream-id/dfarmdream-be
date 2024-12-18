import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '@src/common/dtos/pagination-query.dto';
import { from } from 'rxjs';
import { JWTClaim } from '@src/app/auth/entity/jwt-claim.dto';
import { CreateSensorDevice, UpdateSensorDevice } from '../dtos';
import { SensorDeviceRepository } from '../repositories';

@Injectable()
export class SensorDeviceService {
  constructor(
    private readonly sensorDeviceRepository: SensorDeviceRepository,
  ) {}

  paginate(paginateDto: PaginationQueryDto, claim: JWTClaim) {
    return from(
      this.sensorDeviceRepository.paginate(paginateDto, {
        where: {},
      }),
    );
  }

  detail(id: string) {
    return from(this.sensorDeviceRepository.firstOrThrow({ id }));
  }

  update(id: string, payload: UpdateSensorDevice) {
    return from(this.sensorDeviceRepository.update({ id }, payload));
  }

  destroy(id: string) {
    return from(this.sensorDeviceRepository.delete({ id }));
  }

  create(payload: CreateSensorDevice) {
    return from(this.sensorDeviceRepository.create(payload));
  }
}
