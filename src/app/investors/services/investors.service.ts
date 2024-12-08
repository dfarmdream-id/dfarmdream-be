import { Injectable } from '@nestjs/common';
import { InvestorsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateInvestorsDto, UpdateInvestorsDto } from '../dtos';
import { from, map, switchMap } from 'rxjs';
import { hashSync, verifySync } from '@node-rs/bcrypt';
import { SignInDto } from '@src/app/auth/dtos';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@src/platform/database/services/prisma.service';

@Injectable()
export class InvestorsService {
  constructor(
    private readonly investorRepository: InvestorsRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public paginate(paginateDto: PaginationQueryDto, siteId?: string) {
    console.log('paginateDto', siteId);

    return from(
      this.investorRepository.paginate(paginateDto, {
        where: {
          deletedAt: null,
          OR: [
            // Kondisi 1: Jika investor tidak memiliki documentInvestment
            {
              documentInvestment: {
                none: {}, // Tidak memiliki documentInvestment sama sekali
              },
            },
            // Kondisi 2: Jika investor memiliki documentInvestment dengan siteId tertentu
            {
              documentInvestment: {
                some: {
                  siteId: siteId, // Hanya investor dengan documentInvestment siteId yang cocok
                },
              },
            },
          ],
          AND: [
            // Tambahkan pencarian berdasarkan input (jika ada)
            {
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
          deletedAt: null,
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
        switchMap(async (user) => {
          const site = await this.prisma.site.findMany({
            where: {
              DocumentInvestment: {
                some: {
                  investorId: user.id,
                  deletedAt: null,
                },
              },
            },
          });

          return Object.assign(user, {
            site: site[0],
          });
        }),
        map((user) => {
          if (!user) throw new Error('error.user_not_found');
          return user;
        }),
        map((user) => {
          console.log('user', user);
          console.log('signInDto', signInDto);

          const isValid = signInDto.password === user.password;

          if (!isValid) throw new Error('error.password_not_match');

          if (!user.site) throw new Error('error.site_not_found');

          const token = this.jwtService.sign({
            email: user.username,
            id: user.id,
            name: user.fullName,
            as: 'investor',
            siteId: user?.site?.id,
          });

          return {
            user,
            token,
          };
        }),
      );
  }
}
