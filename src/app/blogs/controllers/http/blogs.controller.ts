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
import { BlogsService } from 'src/app/blogs/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateBlogsDto, UpdateBlogsDto } from 'src/app/blogs/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '@src/app/auth/decorators';
import { User as Auth } from '@prisma/client';
import { merge } from 'lodash';
import { AuthGuard } from '@src/app/auth';

@ApiTags('Blogs')
@Controller({
  path: 'blog',
  version: '1',
})
export class BlogsHttpController {
  constructor(private readonly blogService: BlogsService) {}

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @Post()
  public create(
    @Body() createBlogsDto: CreateBlogsDto,
    @User() user: Auth,
  ): Observable<ResponseEntity> {
    return from(
      this.blogService.create(merge(createBlogsDto, { userId: user.id })),
    ).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        console.log(
          '🦖 ------------------------------------------------------------------------------------🦖',
        );
        console.log(
          '🦖 ~ file: blogs.controller.ts:46 ~ BlogsHttpController ~ catchError ~ error:',
          error,
        );
        console.log(
          '🦖 ------------------------------------------------------------------------------------🦖',
        );

        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return from(this.blogService.paginate(paginateDto)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.blogService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return from(this.blogService.destroy(id)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT')
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateBlogsDto: UpdateBlogsDto,
  ): Observable<ResponseEntity> {
    return from(this.blogService.update(id, updateBlogsDto)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
