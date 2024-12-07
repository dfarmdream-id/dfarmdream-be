import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateFilesDto, UpdateFilesDto } from '../dtos';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { StorageService } from '@src/platform/storage/service/storage.service';
import { ENV } from '@src/config/env';
import { Express } from 'express';
import * as path from 'path';
@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FilesRepository,
    private readonly storageService: StorageService,
  ) {}

  public paginate(paginateDto: PaginationQueryDto) {
    return from(this.fileRepository.paginate(paginateDto));
  }

  public detail(id: string) {
    return from(this.fileRepository.firstOrThrow({ id }));
  }

  public destroy(id: string) {
    return from(this.fileRepository.delete({ id }));
  }

  public extensionToMimetype(extension) {
    extension = '.' + extension.replace(/^\.+/, '');

    const mimetypes = {
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.html': 'text/html',
      '.doc': 'application/msword',
      '.docx':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    return mimetypes[extension] || 'application/octet-stream';
  }

  public async uploadFile(file: Express.Multer.File) {
    const timestamp = Date.now();
    const originalFileName = file.originalname;
    const fileName = `${timestamp}_${originalFileName}`; // 'myfile'
    const fileExtension = path.extname(originalFileName);
    const mimeType = this.extensionToMimetype(fileExtension);
    try {
      const upload = await this.storageService.uploadAsync({
        file: file.buffer,
        fileName: fileName,
        mimeType: mimeType || '',
      });
    } catch (e) {
      throw new HttpException(
        'Failed to upload file into S3',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const result = {
        size: file.size,
        name: fileName,
        url: `${ENV.S3.ENDPOINT}/${ENV.S3.BUCKET_NAME}/${fileName}`,
        public: true,
        mime: mimeType,
      };
      const data = await this.fileRepository.createAsync(result);
      return {
        status: HttpStatus.OK,
        message: 'Success upload file',
        data: {
          id: data.id,
          ...result,
        },
      };
    } catch (e) {
      throw new HttpException(
        'Failed to save file iamge',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public create(createFilesDto: CreateFilesDto) {
    return of(createFilesDto).pipe(
      mergeMap((data) =>
        this.storageService
          .upload({
            file: Buffer.from(data.file, 'base64'),
            fileName: data.name,
            mimeType: data.mimeType,
          })
          .pipe(
            map(() => data),
            catchError(() => {
              console.log('Failed to upload file');
              throw new Error('Failed to upload file');
            }),
          ),
      ),
      map((data) => ({
        size: data.file.length,
        name: data.name,
        url: `${ENV.S3.ENDPOINT}/${ENV.S3.BUCKET_NAME}/${data.name}`,
        public: data.public,
        mime: data.mimeType,
      })),
      mergeMap((data) => this.fileRepository.create(data)),
    );
  }

  public update(id: string, updateFilesDto: UpdateFilesDto) {
    return from(this.fileRepository.update({ id }, updateFilesDto));
  }
}
