import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import {
  InvestorsRepository,
  type Filter,
} from 'src/app/investors/repositories';
import { InvestorsService } from 'src/app/investors/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateInvestorsDto, UpdateInvestorsDto } from 'src/app/investors/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Investors')
@Controller({
  path: 'investor',
  version: '1',
})
export class InvestorsMicroserviceController {
  constructor(
    private readonly investorService: InvestorsService,
    private readonly investorRepository: InvestorsRepository,
  ) {}

  @MessagePattern('investor.create')
  public create(@Payload() createInvestorsDto: CreateInvestorsDto) {
    return from(this.investorService.create(createInvestorsDto)).pipe(
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

  @MessagePattern('investor.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.investorRepository.find(filter)).pipe(
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

  @MessagePattern('investor.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.investorService.paginate(paginateDto)).pipe(
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

  @MessagePattern('investor.detail')
  public detail(@Payload('id') id: string) {
    return from(this.investorService.detail(id)).pipe(
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

  @MessagePattern('investor.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.investorService.destroy(id)).pipe(
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
    @Payload() updateInvestorsDto: UpdateInvestorsDto,
  ) {
    return from(this.investorService.update(id, updateInvestorsDto)).pipe(
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
