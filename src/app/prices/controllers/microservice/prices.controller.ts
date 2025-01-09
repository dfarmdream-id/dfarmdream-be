import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { PricesRepository, type Filter } from 'src/app/prices/repositories';
import { PricesService } from 'src/app/prices/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreatePricesDto, UpdatePricesDto } from 'src/app/prices/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { GetPricesDto } from '../../dtos/get-prices.dto';
import { User } from '@src/app/auth/decorators';

@ApiTags('Prices')
@Controller({
  path: 'price',
  version: '1',
})
export class PricesMicroserviceController {
  constructor(
    private readonly priceService: PricesService,
    private readonly priceRepository: PricesRepository,
  ) {}

  @MessagePattern('price.create')
  public create(@Payload() createPricesDto: CreatePricesDto,  @User() user: { id: string; siteId: string },) {
    return from(this.priceService.create(createPricesDto, user.id)).pipe(
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

  @MessagePattern('price.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.priceRepository.find(filter)).pipe(
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

  @MessagePattern('price.paginate')
  public index(@Payload() paginateDto: GetPricesDto) {
    return from(this.priceService.paginate(paginateDto)).pipe(
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

  @MessagePattern('price.detail')
  public detail(@Payload('id') id: string) {
    return from(this.priceService.detail(id)).pipe(
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

  @MessagePattern('price.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.priceService.destroy(id)).pipe(
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
    @Payload() updatePricesDto: UpdatePricesDto,
    @User() user: { id: string, siteId: string },
  ) {
    return from(this.priceService.update(id, updatePricesDto, user.id, user.siteId)).pipe(
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
