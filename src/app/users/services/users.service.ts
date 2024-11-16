import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateUsersDto, UpdateUsersDto } from '../dtos';
import { hashSync, verifySync } from '@node-rs/bcrypt';
import { SignInDto } from 'src/app/auth/dtos';
import { catchError, from, map, switchMap } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return this.userRepository.paginate(paginateDto, {
      where: {
        deletedAt: null,
      },
    });
  }

  public detail(id: string) {
    return from(
      this.userRepository.firstOrThrow(
        {
          id,
        },
        {
          id: true,
          email: true,
          fullName: true,
          username: true,
          address: true,
          phone: true,
          sites: true,
          position: true,
          createdAt: true,
          updatedAt: true,
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
        phone: createUsersDto.phone,
        sites: {
          createMany: {
            data: createUsersDto.sites,
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
      return this.userRepository.update(
        { id },
        {
          address: updateUsersDto.address,
          fullName: updateUsersDto.fullName,
          email: updateUsersDto.email,
          sites: {
            set: updateUsersDto.sites,
          },
          roles: {
            set: updateUsersDto.roles,
          },
        },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public signUp(signUpDto: CreateUsersDto) {
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
      this.userRepository.firstOrThrow({
        OR: [
          {
            email: signInDto.username,
          },
          {
            username: signInDto.username,
          },
        ],
      }),
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
