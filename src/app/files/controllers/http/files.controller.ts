import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from 'src/app/files/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateFilesDto, UpdateFilesDto } from 'src/app/files/dtos';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import {Express} from 'express'
@ApiTags('Files')
@Controller({
  path: 'file',
  version: '1',
})
export class FilesHttpController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/upload')
  // @Roles('Admin')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators:[new MaxFileSizeValidator({
        maxSize:10 * 1024 * 1024, //10MB
        message:"File is too large. Max file size is 10MB"
      }),
    ],
    fileIsRequired:true
  })) file:Express.Multer.File){
    return this.fileService.uploadFile(file)
  }
  
  @Post()
  public create(
    @Body() createFilesDto: CreateFilesDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.create(createFilesDto)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.paginate(paginateDto)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return from(this.fileService.detail(id)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return from(this.fileService.destroy(id)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateFilesDto: UpdateFilesDto,
  ): Observable<ResponseEntity> {
    return from(this.fileService.update(id, updateFilesDto)).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
