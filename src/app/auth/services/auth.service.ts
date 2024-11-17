import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/services';
import { SignInChoose, SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpDto } from '../dtos';
import { forkJoin, from, map } from 'rxjs';
import { pick } from 'lodash';
import { PrismaService } from '@src/platform/database/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  signIn(signInDto: SignInDto) {
    return this.userService.signIn(signInDto).pipe(
      map((user) => ({
        user: pick(user, ['email', 'id', 'fullName', 'sites']),
      })),
    );
  }

  signInChoose(signInDto: SignInChoose) {
    return this.userService.signIn(signInDto).pipe(
      map((user) => ({
        token: this.jwtService.sign({
          email: user.email,
          id: user.id,
          name: user.fullName,
          siteId: signInDto.siteId,
        }),
        user: pick(user, ['email', 'id', 'fullName', 'sites']),
      })),
    );
  }

  signUp(signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto).pipe(
      map((user) => pick(user, ['email', 'id', 'fullName'])),
      map((user) => {
        const token = this.jwtService.sign({
          email: user.email,
          id: user.id,
          name: user.fullName,
        });

        return { token, user };
      }),
    );
  }

  profile(user: User & { siteId: string }) {
    console.log(user.siteId);
    const u = this.userService.detail(user.id);
    const site = from(
      this.prisma.site.findUnique({
        where: {
          id: user.siteId,
        },
      }),
    );
    return forkJoin({
      user: u,
      site: site,
    }).pipe(
      map((data) => {
        return {
          ...data.user,
          site: data.site,
        };
      }),
    );
  }
}
