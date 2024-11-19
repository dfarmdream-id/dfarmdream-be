import { Controller } from '@nestjs/common';
import { TransactionsRepository } from 'src/app/transactions/repositories';
import { TransactionsService } from 'src/app/transactions/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller({
  path: 'transaction',
  version: '1',
})
export class TransactionsMicroserviceController {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  // @MessagePattern('transaction.create')
  // public create(@Payload() createTransactionsDto: CreateTransactionsDto) {
  //   return from(this.transactionService.create(createTransactionsDto)).pipe(
  //     map(
  //       (data) =>
  //         new ResponseEntity({
  //           data,
  //           message: 'success',
  //         }),
  //     ),
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }

  // @MessagePattern('transaction.find')
  // public find(@Payload() filter: Omit<Filter, 'include'>) {
  //   return from(this.transactionRepository.find(filter)).pipe(
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }

  // @MessagePattern('transaction.paginate')
  // public index(@Payload() paginateDto: PaginationQueryDto) {
  //   return from(this.transactionService.paginate(paginateDto)).pipe(
  //     map(
  //       (data) =>
  //         new ResponseEntity({
  //           data,
  //           message: 'success',
  //         }),
  //     ),
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }

  // @MessagePattern('transaction.detail')
  // public detail(@Payload('id') id: string) {
  //   return from(this.transactionService.detail(id)).pipe(
  //     map(
  //       (data) =>
  //         new ResponseEntity({
  //           data,
  //           message: 'success',
  //         }),
  //     ),
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }

  // @MessagePattern('transaction.destroy')
  // public destroy(@Payload('id') id: string) {
  //   return from(this.transactionService.destroy(id)).pipe(
  //     map(
  //       (data) =>
  //         new ResponseEntity({
  //           data,
  //           message: 'success',
  //         }),
  //     ),
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }

  // @MessagePattern(':id')
  // public update(
  //   @Payload('id') id: string,
  //   @Payload() updateTransactionsDto: UpdateTransactionsDto,
  // ) {
  //   return from(this.transactionService.update(id, updateTransactionsDto)).pipe(
  //     map(
  //       (data) =>
  //         new ResponseEntity({
  //           data,
  //           message: 'success',
  //         }),
  //     ),
  //     catchError((error) => {
  //       throw new RpcException(
  //         new ResponseEntity({
  //           status: HttpStatus.BAD_REQUEST,
  //           message: error.message,
  //         }),
  //       );
  //     }),
  //   );
  // }
}
