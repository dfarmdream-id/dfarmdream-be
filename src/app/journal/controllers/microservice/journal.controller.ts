import { Controller } from '@nestjs/common';
import { JournalHeaderRepository } from '@app/journal/repositories';
import { JournalService } from '@app/journal/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JournalHeaders')
@Controller({
  path: 'journal',
  version: '1',
})
export class JournalHeadersMicroserviceController {
  constructor(
    private readonly journalService: JournalService,
    private readonly journalRepository: JournalHeaderRepository,
  ) {}

  // @MessagePattern('journal.create')
  // public create(@Payload() createJournalHeadersDto: CreateJournalDto) {
  //   return from(this.journalService.create(createJournalHeadersDto)).pipe(
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

  // @MessagePattern('journal.find')
  // public find(@Payload() filter: Omit<Filter, 'include'>) {
  //   return from(this.journalRepository.find(filter)).pipe(
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

  // @MessagePattern('journal.paginate')
  // public index(@Payload() paginateDto: PaginationQueryDto) {
  //   return from(this.journalService.paginate(paginateDto)).pipe(
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

  // @MessagePattern('journal.detail')
  // public detail(@Payload('id') id: string) {
  //   return from(this.journalService.detail(id)).pipe(
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

  // @MessagePattern('journal.destroy')
  // public destroy(@Payload('id') id: string) {
  //   return from(this.journalService.destroy(id)).pipe(
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
  //   @Payload() updateJournalHeadersDto: UpdateJournalDto,
  // ) {
  //   return from(
  //     this.journalService.update(id, updateJournalHeadersDto),
  //   ).pipe(
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
