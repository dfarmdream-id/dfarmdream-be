import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/services';
import { SignInChoose, SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dtos';
import { forkJoin, from, map } from 'rxjs';
import { pick } from 'lodash';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { UpdatePasswordDTO } from '../dtos/update-password.dto';
import { UpdateProfileDTO } from '../dtos/update-profile.dto';
import { hashSync, verifySync } from '@node-rs/bcrypt';
import { Prisma } from '@prisma/client';

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

  profile(user: { as: 'user' | 'investor'; id: string } & { siteId: string }) {
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

  async updatePassword(
    user: { as: 'user' | 'investor'; id: string } & { siteId: string },
    payload: UpdatePasswordDTO,
  ) {
    const userModel = await this.prisma.user.findFirstOrThrow({
      where: { id: user.id },
    });
    console.log(userModel.password);

    if (!verifySync(payload.currentPassword, userModel?.password)) {
      throw new HttpException('Wrong Current Password', HttpStatus.BAD_REQUEST);
    }
    try {
      const newPassword = hashSync(payload.newPassword);
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: newPassword,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Success update profile',
        data: [],
      };
    } catch (e: any) {
      console.log(e);
      throw new HttpException(
        'Failed to update password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProfile(
    user: { as: 'user' | 'investor'; id: string } & { siteId: string },
    body: UpdateProfileDTO,
  ) {
    const cekUsername = await this.prisma.user.findFirst({
      where: {
        username: body.username,
        NOT: {
          id: user.id,
        },
      },
    });
    if (cekUsername) {
      throw new HttpException('Username already exist', HttpStatus.BAD_REQUEST);
    }
    try {
      const payload: Prisma.UserUpdateInput = {
        fullName: body.fullName,
        address: body.address,
        email: body.email,
        phone: body.phone,
      };

      if (body.imageId) {
        Object.assign(payload, {
          photoProfile: body?.imageId,
        });
      }
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...payload,
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Success update profile',
        data: [],
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Failed to update password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getMySite(userId: string) {
    return this.userService.getMySite(userId);
  }

  switchSite(userId: string, siteId: string) {
    return this.userService.detail(userId).pipe(
      map((user) => {
        const token = this.jwtService.sign({
          email: user.email,
          id: user.id,
          name: user.fullName,
          siteId: siteId,
        });
        return { token, user };
      }),
    );
  }
}
