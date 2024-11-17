import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { SitesRepository, type Filter } from 'src/app/sites/repositories';
import { SitesService } from 'src/app/sites/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateSitesDto, UpdateSitesDto } from 'src/app/sites/dtos';
import { map, catchError } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { from } from 'rxjs';

@ApiTags('Sites')
@Controller({
  path: 'site',
  version: '1',
})
export class SitesMicroserviceController {
  constructor(
    private readonly siteService: SitesService,
    private readonly siteRepository: SitesRepository,
  ) {}

  @MessagePattern('site.create')
  public create(@Payload() createSitesDto: CreateSitesDto) {
    return from(this.siteService.create(createSitesDto)).pipe(
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

  @MessagePattern('site.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.siteRepository.find(filter)).pipe(
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

  @MessagePattern('site.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.siteService.paginate(paginateDto)).pipe(
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

  @MessagePattern('site.detail')
  public detail(@Payload('id') id: string) {
    return from(this.siteService.detail(id)).pipe(
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

  @MessagePattern('site.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.siteService.destroy(id)).pipe(
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
    @Payload() updateSitesDto: UpdateSitesDto,
  ) {
    return from(this.siteService.update(id, updateSitesDto)).pipe(
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
