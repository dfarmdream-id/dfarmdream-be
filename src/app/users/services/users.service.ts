import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateUsersDto, UpdateUsersDto } from '../dtos';
import { hashSync, verifySync } from '@node-rs/bcrypt';
import { SignInDto, SignUpDto } from 'src/app/auth/dtos';
import { catchError, from, map, switchMap } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public getMySite(userId: string) {
    return this.userRepository.getMySite(userId);
  }

  public paginate(paginateDto: PaginationQueryDto, siteId: string) {
    // Destructuring `paginateDto` untuk nilai default
    const { q } = paginateDto;

    // Filter `where` untuk query utama
    const where: Prisma.UserWhereInput = {
      deletedAt: null,
      sites: {
        some: { siteId },
      },
      ...(q && {
        OR: [
          { username: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { fullName: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { identityId: { contains: q, mode: Prisma.QueryMode.insensitive } },
        ],
      }),
    };

    // Debugging query `where`
    // console.log('Generated Where Clause:', JSON.stringify(where, null, 2));

    // Optimized paginate function
    return this.userRepository.paginate(paginateDto, {
      where,
      include: {
        sites: { include: { site: true } },
        cages: { include: { cage: true } },
        roles: true,
        position: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public detail(id: string) {
    return from(
      this.userRepository.firstOrThrow(
        {
          id,
        },
        {
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
          sites: {
            include: {
              site: true,
            },
          },
          cages: {
            include: {
              cage: true,
            },
          },
          position: true,
        },
      ),
    ).pipe(
      catchError((error) => {
        throw new Error(error);
      }),
    );
  }

  public async destroy(id: string) {
    try {
      return this.userRepository.delete({
        id,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async create(createUsersDto: CreateUsersDto) {
    try {
      return this.userRepository.create({
        password: hashSync(createUsersDto.password),
        username: createUsersDto.username,
        address: createUsersDto.address,
        fullName: createUsersDto.fullName,
        identityId: createUsersDto.identityId,
        status: createUsersDto.status,
        email: createUsersDto.email,
        phone: createUsersDto.phone,
        sites: {
          createMany: {
            data: createUsersDto.sites,
            skipDuplicates: true,
          },
        },
        cages: {
          createMany: {
            data: createUsersDto.cages,
            skipDuplicates: true,
          },
        },
        position: {
          connect: {
            id: createUsersDto.positionId,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(id: string, updateUsersDto: UpdateUsersDto) {
    try {
      const payload: Prisma.UserUpdateInput = {
        address: updateUsersDto.address,
        fullName: updateUsersDto.fullName,
        email: updateUsersDto.email,
        sites: {
          deleteMany: {},
          createMany: {
            data:
              updateUsersDto.sites?.map((v) => {
                return v;
              }) || [],
            skipDuplicates: true,
          },
        },
        cages: {
          deleteMany: {},
          createMany: {
            data:
              updateUsersDto.cages?.map((v) => {
                return v;
              }) || [],
            skipDuplicates: true,
          },
        },
        phone: updateUsersDto.phone,
        password: updateUsersDto.password
          ? hashSync(updateUsersDto.password)
          : undefined,
        roles: {
          deleteMany: {},
          createMany: {
            data:
              updateUsersDto.roles?.map((v) => {
                return v;
              }) || [],
            skipDuplicates: true,
          },
        },
        status: updateUsersDto.status,
        identityId: updateUsersDto.identityId?updateUsersDto.identityId:undefined,
      };

      if (updateUsersDto.positionId) {
        Object.assign(payload, {
          position: {
            connect: {
              id: updateUsersDto.positionId,
            },
          },
        });
      }

      return this.userRepository.update({ id }, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public signUp(signUpDto: SignUpDto) {
    return from(
      this.userRepository.any({
        where: {
          email: signUpDto.email,
        },
      }),
    ).pipe(
      map((exist) => {
        if (exist) throw new Error('error.user_already_exist');
        return hashSync(signUpDto.password);
      }),
      switchMap((password) => {
        return this.userRepository.create({
          username: signUpDto.username,
          fullName: signUpDto.fullName,
          email: signUpDto.email,
          password,
        });
      }),
    );
  }

  public signIn(signInDto: SignInDto) {
    return from(
      this.userRepository.firstOrThrow(
        {
          OR: [
            {
              email: signInDto.username,
            },
            {
              username: signInDto.username,
            },
          ],
          sites: {
            some: {
              site: {
                deletedAt: null,
              },
            },
          },
        },
        {
          sites: {
            include: {
              site: true,
            },
          },
        },
      ),
    ).pipe(
      map((user) => {
        if (!verifySync(signInDto.password, user.password))
          throw new Error('error.password_not_match');

        return user;
      }),
      catchError(() => {
        throw new Error('error.user_not_found');
      }),
    );
  }
}
