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
import { ChickenCageRacksService } from 'src/app/chicken-cage-racks/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateChickenCageRacksDto,
  UpdateChickenCageRacksDto,
} from 'src/app/chicken-cage-racks/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';
import { GetCageRackDto } from '../../dtos/get-cage-rack.dto';
import { User } from '@src/app/auth/decorators';

@ApiSecurity('JWT')
@ApiTags('ChickenCageRacks')
@Controller({
  path: 'chicken-cage-rack',
  version: '1',
})
export class ChickenCageRacksHttpController {
  constructor(
    private readonly chickencagerackService: ChickenCageRacksService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createChickenCageRacksDto: CreateChickenCageRacksDto,
  ): Observable<ResponseEntity> {
    return this.chickencagerackService.create(createChickenCageRacksDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: GetCageRackDto,
    @User() user: { id: string; siteId: string },
  ): Observable<ResponseEntity> {
    return this.chickencagerackService.paginate(paginateDto, user.siteId).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.chickencagerackService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.chickencagerackService.destroy(id).pipe(
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
    @Body() updateChickenCageRacksDto: UpdateChickenCageRacksDto,
  ): Observable<ResponseEntity> {
    return this.chickencagerackService
      .update(id, updateChickenCageRacksDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}
