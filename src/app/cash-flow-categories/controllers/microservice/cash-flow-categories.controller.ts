import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  CashFlowCategoriesRepository,
  type Filter,
} from 'src/app/cash-flow-categories/repositories';
import { CashFlowCategoriesService } from 'src/app/cash-flow-categories/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateCashFlowCategoriesDto,
  UpdateCashFlowCategoriesDto,
} from 'src/app/cash-flow-categories/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth';
import { User } from '@app/auth/decorators';

@ApiTags('CashFlowCategories')
@Controller({
  path: 'cashflowcategory',
  version: '1',
})
export class CashFlowCategoriesMicroserviceController {
  constructor(
    private readonly cashflowcategoryService: CashFlowCategoriesService,
    private readonly cashflowcategoryRepository: CashFlowCategoriesRepository,
  ) {}

  @MessagePattern('cashflowcategory.create')
  public create(
    @Payload() createCashFlowCategoriesDto: CreateCashFlowCategoriesDto,
  ) {
    return from(
      this.cashflowcategoryService.create(createCashFlowCategoriesDto),
    ).pipe(
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

  @MessagePattern('cashflowcategory.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.cashflowcategoryRepository.find(filter)).pipe(
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

  @UseGuards(AuthGuard)
  @MessagePattern('cashflowcategory.paginate')
  public index(
    @Payload() paginateDto: PaginationQueryDto,
    @User() user: { id: string; siteId: string },
  ) {
    return from(
      this.cashflowcategoryService.paginate(paginateDto, user.siteId),
    ).pipe(
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

  @MessagePattern('cashflowcategory.detail')
  public detail(@Payload('id') id: string) {
    return from(this.cashflowcategoryService.detail(id)).pipe(
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

  @MessagePattern('cashflowcategory.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.cashflowcategoryService.destroy(id)).pipe(
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
    @Payload() updateCashFlowCategoriesDto: UpdateCashFlowCategoriesDto,
  ) {
    return from(
      this.cashflowcategoryService.update(id, updateCashFlowCategoriesDto),
    ).pipe(
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
