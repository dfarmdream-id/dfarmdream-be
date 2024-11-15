import { Injectable } from '@nestjs/common';
import { FilesRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateFilesDto, UpdateFilesDto } from '../dtos';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { StorageService } from '@src/platform/storage/service/storage.service';

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

  public create(createFilesDto: CreateFilesDto) {
    return of(createFilesDto).pipe(
      mergeMap((data) =>
        this.storageService
          .upload({
            file: data.file,
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
        url: data.url,
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
