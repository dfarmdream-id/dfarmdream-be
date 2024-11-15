import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../repositories';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateBlogsDto, UpdateBlogsDto } from '../dtos';
import { from, mergeMap, Observable, of, switchMap } from 'rxjs';
import { kebabCase } from 'lodash';
import { FilesService } from '@src/app/files/services';

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogRepository: BlogsRepository,
    private readonly fileService: FilesService,
  ) {}

  public paginate(paginateDto: PaginationQueryDto): Observable<any> {
    return from(this.blogRepository.paginate(paginateDto));
  }

  public detail(id: string): Observable<any> {
    return from(this.blogRepository.firstOrThrow({ id }));
  }

  public destroy(id: string): Observable<any> {
    return from(this.blogRepository.delete({ id }));
  }

  public create(createBlogsDto: CreateBlogsDto & Partial<{ userId: string }>) {
    return of(createBlogsDto).pipe(
      mergeMap((data) => {
        if (!data.image) return of({ id: undefined });
        return this.fileService.create({
          name: data.title,
          file: Buffer.from(data.image.split(',')[1], 'base64'),
          mimeType: 'image/png',
          public: true,
        });
      }),
      switchMap(async (data) => {
        const slug = createBlogsDto.slug
          ? kebabCase(createBlogsDto.slug)
          : kebabCase(createBlogsDto.title);

        const nanoId = await import('nanoid');

        return {
          ...data,
          slug: `${slug}-${nanoId.nanoid(10)}`,
        };
      }),
      mergeMap((data) => {
        return this.blogRepository.create({
          content: createBlogsDto.content,
          cover: {
            connect: {
              id: data.id,
            },
          },
          author: {
            connect: {
              id: createBlogsDto.userId,
            },
          },
          slug: data.slug,
          title: createBlogsDto.title,
          createdAt: new Date(),
        });
      }),
    );
  }

  public update(id: string, updateBlogsDto: UpdateBlogsDto): Observable<any> {
    return from(this.blogRepository.update({ id }, updateBlogsDto));
  }
}
