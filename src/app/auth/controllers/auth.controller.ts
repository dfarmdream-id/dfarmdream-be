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
import { SignUpDto } from '../dtos';
import { catchError, forkJoin, from, map, of, switchMap } from 'rxjs';
import { pick } from 'lodash';
import { UpdateProfileDTO } from '../dtos/update-profile.dto';
import { UpdatePasswordDTO } from '../dtos/update-password.dto';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { FilesService } from '@src/app/files/services';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly fileService: FilesService,
  ) {}

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
  profile(
    @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    if (user.as === 'investor') {
      const site = from(
        this.prisma.site.findMany({
          where: {
            id: user.siteId,
          },
        }),
      ).pipe(
        switchMap((site) => {
          if (site.length === 0) {
            throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
          }
          return site;
        }),
      );

      const u = from(
        this.prisma.investor.findUniqueOrThrow({
          where: {
            id: user.id,
          },
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: {
                          include: {
                            rolePermission: {
                              include: {
                                permission: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      );
      return forkJoin({
        user: u,
        site: site,
      }).pipe(
        map(
          (data) =>
            new ResponseEntity({
              message: 'success',
              data: {
                ...data.user,
                site: data.site,
              },
            }),
        ),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
        }),
      );
    }

    return this.authService.profile(user).pipe(
      map((data) => {
        if (!data.photoProfile) {
          return new ResponseEntity({
            message: 'success',
            data: data,
          });
        }
        return data;
      }),
      switchMap((data) => {
        if (data instanceof ResponseEntity) {
          return of(data);
        }
        return this.fileService.detail(data.photoProfile!).pipe(
          map((fileData) => {
            data.photoProfile = fileData?.url ?? null;
            return new ResponseEntity({
              message: 'success',
              data: data,
            });
          }),
        );
      }),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post('update-profile')
  updateProfile(
    @Body() payload: UpdateProfileDTO,
    @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    return this.authService.updateProfile(user, payload);
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post('update-password')
  updatePassword(
    @Body() payload: UpdatePasswordDTO,
    @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    return this.authService.updatePassword(user, payload);
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Get('sites')
  getMySite(
    @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    return this.authService.getMySite(user.id, user.as).pipe(
      map((data) => new ResponseEntity({ data })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }

  @ApiSecurity('JWT')
  @UseGuards(AuthGuard)
  @Post('switch')
  switchSite(
    @Body() payload: { siteId: string },
    @User() user: { as: 'user' | 'investor'; id: string } & { siteId: string },
  ) {
    return this.authService.switchSite(user.id, payload.siteId, user.as).pipe(
      map((data) => new ResponseEntity({ data })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }),
    );
  }
}
