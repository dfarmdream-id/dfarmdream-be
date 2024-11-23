import { Module } from '@nestjs/common';
import { CctvCameraController } from './controllers';
import { CctvCameraService } from './services';
import { CctvCameraRepository } from './repositories';

@Module({
  controllers: [CctvCameraController],
  providers: [CctvCameraService, CctvCameraRepository],
})
export class CctvCameraModule {}
