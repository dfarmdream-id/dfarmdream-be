import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { BlogsRepository, type Filter } from 'src/app/blogs/repositories';
import { BlogsService } from 'src/app/blogs/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateBlogsDto, UpdateBlogsDto } from 'src/app/blogs/dtos';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller({
  path: 'blog',
  version: '1',
})
export class BlogsMicroserviceController {
  constructor(
    private readonly blogService: BlogsService,
    private readonly blogRepository: BlogsRepository,
  ) {}

  @MessagePattern('blog.create')
  public create(
    @Payload() createBlogsDto: CreateBlogsDto,
  ): Observable<ResponseEntity> {
    return from(this.blogService.create(createBlogsDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('blog.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.blogRepository.find(filter)).pipe(
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('blog.paginate')
  public index(
    @Payload() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return from(this.blogService.paginate(paginateDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('blog.detail')
  public detail(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.blogService.detail(id)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern('blog.destroy')
  public destroy(@Payload('id') id: string): Observable<ResponseEntity> {
    return from(this.blogService.destroy(id)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }

  @MessagePattern(':id')
  public update(
    @Payload('id') id: string,
    @Payload() updateBlogsDto: UpdateBlogsDto,
  ): Observable<ResponseEntity> {
    return from(this.blogService.update(id, updateBlogsDto)).pipe(
      map(
        (data) =>
          new ResponseEntity({
            data,
            message: 'success',
          }),
      ),
      catchError((error) => {
        throw new RpcException(
          new ResponseEntity({
            status: HttpStatus.BAD_REQUEST,
            message: error.message,
          }),
        );
      }),
    );
  }
}
