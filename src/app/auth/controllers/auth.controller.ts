import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SignInChoose, SignInDto } from '../dtos/sign-in.dto';
import { ResponseEntity } from '@src/common/entities/response.entity';
import { AuthGuard } from '../guards';
import { User } from '../decorators';
import { User as Auth } from '@prisma/client';
import { SignUpDto } from '../dtos';
import { catchError, map } from 'rxjs';
import { pick } from 'lodash';
import { UpdateProfileDTO } from '../dtos/update-profile.dto';
import { UpdatePasswordDTO } from '../dtos/update-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signInSite(@Body() createAuthDto: SignInDto) {
    return this.authService.signIn(createAuthDto).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data: pick(data, 'user').user,
          }),
      ),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @ApiOperation({
    summary: 'Sign in',
  })
  @Post('sign-in/choose')
  signIn(@Body() createAuthDto: SignInChoose) {
    return this.authService.signInChoose(createAuthDto).pipe(
      map((data) => new ResponseEntity({ data })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto).pipe(
      map((data) => new ResponseEntity({ data })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@User() user: Auth & { siteId: string }) {
    return this.authService.profile(user).pipe(
      map(
        (data) =>
          new ResponseEntity({
            message: 'success',
            data: data,
          }),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }),
      ),
    );
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post('update-profile')
  updateProfile(@Body() payload:UpdateProfileDTO,@User() user: Auth & { siteId: string }) {
    return this.authService.updateProfile(user,payload)
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post('update-password')
  updatePassword(@Body() payload:UpdatePasswordDTO, @User() user: Auth & { siteId: string }) {
    return this.authService.updatePassword(user, payload)
    
  }
}
