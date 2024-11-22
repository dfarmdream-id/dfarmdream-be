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
  import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
  import { ResponseEntity } from 'src/common/entities/response.entity';
  import { ApiSecurity, ApiTags } from '@nestjs/swagger';
  import { catchError, map } from 'rxjs';
  import { Observable } from 'rxjs';
  import { AuthGuard } from '@src/app/auth';
import { CctvCameraService } from '../../services';
import { CreateCameraDTO, UpdateCameraDTO } from '../../dtos';
  
  @ApiSecurity('JWT')
  @ApiTags('CCTV Camera')
  @Controller({
    path: 'cctv-camera',
    version: '1',
  })
  export class CctvCameraController {
    constructor(private readonly cameraService: CctvCameraService) {}
  
    @UseGuards(AuthGuard)
    @Post()
    public create(
      @Body() createCameraDTO: CreateCameraDTO,
    ): Observable<ResponseEntity> {
      return this.cameraService.create(createCameraDTO).pipe(
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
      return this.cameraService.paginate(paginateDto).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }
  
    @UseGuards(AuthGuard)
    @Get(':id')
    public detail(@Param('id') id: string): Observable<ResponseEntity> {
      return this.cameraService.detail(id).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }),
      );
    }
  
    @UseGuards(AuthGuard)
    @Delete(':id')
    public destroy(@Param('id') id: string): Observable<ResponseEntity> {
      return this.cameraService.destroy(id).pipe(
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
      @Body() updateCameraDTO: UpdateCameraDTO,
    ): Observable<ResponseEntity> {
      return this.cameraService.update(id, updateCameraDTO).pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
    }
  }
  