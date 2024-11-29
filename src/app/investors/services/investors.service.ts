import { Injectable } from '@nestjs/common';
import { InvestorsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateInvestorsDto, UpdateInvestorsDto } from '../dtos';
import { from, map } from 'rxjs';
import { hashSync, verifySync } from '@node-rs/bcrypt';
import { SignInDto } from '@src/app/auth/dtos';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class InvestorsService {
  constructor(
    private readonly investorRepository: InvestorsRepository,
    private readonly jwtService: JwtService,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(
      this.investorRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
          OR: [
            {
              fullName: {
                contains: paginateDto.q,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              identityId: {
                contains: paginateDto.q,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              username: {
                contains: paginateDto.q,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );
  }

  public detail(id: string) {
    return from(
      this.investorRepository.firstOrThrow(
        { id },
        {
          roles: {
            include: {
              role: true,
            },
          },
        },
      ),
    );
  }

  public destroy(id: string) {
    return from(this.investorRepository.delete({ id }));
  }

  public create(createInvestorsDto: CreateInvestorsDto) {
    return from(
      this.investorRepository.create({
        ...createInvestorsDto,
        password: hashSync(createInvestorsDto.password),
        roles: {
          createMany: {
            data: createInvestorsDto.roles,
            skipDuplicates: true,
          },
        },
      }),
    );
  }

  public update(id: string, updateInvestorsDto: UpdateInvestorsDto) {
    return from(
      this.investorRepository.update(
        { id },
        {
          ...updateInvestorsDto,
          roles: {
            deleteMany: {},
            createMany: {
              data: updateInvestorsDto.roles || [],
              skipDuplicates: true,
            },
          },
        },
      ),
    );
  }

  signIn(signInDto: SignInDto) {
    return this.investorRepository
      .find({
        where: {
          OR: [
            {
              username: signInDto.username,
            },
            {
              identityId: signInDto.username,
            },
          ],
        },
      })
      .pipe(
        map((user) => {
          return user[0];
        }),
        map((user) => {
          if (!user) throw new Error('error.user_not_found');
          return user;
        }),
        map((user) => {
          const isValid = verifySync(signInDto.password, user.password);

          if (!isValid) throw new Error('error.password_not_match');

          const token = this.jwtService.sign({
            email: user.username,
            id: user.id,
            name: user.fullName,
            as: 'investor',
          });

          return {
            user,
            token,
          };
        }),
      );
  }
}
