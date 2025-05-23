import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { UsersModule } from '../users';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards';
import { FilesModule } from '../files';
import { SitesRepository } from '../sites/repositories';
import { InvestorsRepository } from '../investors/repositories';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    FilesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, InvestorsRepository, SitesRepository],
  exports: [AuthGuard],
})
export class AuthModule {}
