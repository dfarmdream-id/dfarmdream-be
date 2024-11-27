import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@src/platform/database/services/prisma.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = {
        ...payload,
      };

      if (payload.as == 'investor') {
        const u = await this.prismaService.investor.findFirst({
          where: {
            id: payload.id,
          },
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        const permissions = u?.roles
          ?.map((role) => {
            return role.role.permissions.map((permission) => {
              return permission.permission.code;
            });
          })
          .flat();

        Object.assign(user, {
          permissions: permissions,
        });
        request['user'] = user;
        return true;
      }

      const u = await this.prismaService.user.findFirst({
        where: {
          id: payload.id,
        },
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const permissions = u?.roles
        ?.map((role) => {
          return role.role.permissions.map((permission) => {
            return permission.permission.code;
          });
        })
        .flat();

      Object.assign(user, {
        permissions: permissions,
      });
      request['user'] = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
