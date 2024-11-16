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
import { RolesService } from 'src/app/roles/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateRolesDto, UpdateRolesDto } from 'src/app/roles/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';

@ApiSecurity('JWT')
@ApiTags('Roles')
@Controller({
  path: 'role',
  version: '1',
})
export class RolesHttpController {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createRolesDto: CreateRolesDto,
  ): Observable<ResponseEntity> {
    return this.roleService.create(createRolesDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return this.roleService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.roleService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.roleService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateRolesDto: UpdateRolesDto,
  ): Observable<ResponseEntity> {
    return this.roleService.update(id, updateRolesDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
