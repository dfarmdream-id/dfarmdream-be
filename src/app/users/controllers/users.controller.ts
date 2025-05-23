import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateUsersDto, UpdateUsersDto } from '../dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth';
import { catchError, map } from 'rxjs';
import { User } from '@src/app/auth/decorators';

@ApiTags('Users')
@ApiSecurity('JWT')
@UseGuards(AuthGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  public async create(@Body() createUsersDto: CreateUsersDto) {
    try {
      const data = await this.userService.create(createUsersDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  public async index(
    @Query() paginateDto: PaginationQueryDto,
    @User() user: { id: string; siteId: string },
  ) {
    try {
      const data = await this.userService.paginate(paginateDto, user.siteId);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async detail(@Param('id') id: string) {
    return this.userService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public async destroy(@Param('id') id: string) {
    try {
      const data = await this.userService.destroy(id);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    try {
      const data = await this.userService.update(id, updateUsersDto);
      return new ResponseEntity({
        data,
        message: 'success',
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
