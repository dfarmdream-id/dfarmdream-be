import { Controller } from '@nestjs/common';
import { JournalHeadersRepository } from 'src/app/journal-headers/repositories';
import { JournalHeadersService } from 'src/app/journal-headers/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JournalHeaders')
@Controller({
  path: 'journalheader',
  version: '1',
})
export class JournalHeadersMicroserviceController {
  constructor(
    private readonly journalheaderService: JournalHeadersService,
    private readonly journalheaderRepository: JournalHeadersRepository,
  ) {}

  // @MessagePattern('journalheader.create')
  // public create(@Payload() createJournalHeadersDto: CreateJournalHeadersDto) {
  //   return from(this.journalheaderService.create(createJournalHeadersDto)).pipe(
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

  // @MessagePattern('journalheader.find')
  // public find(@Payload() filter: Omit<Filter, 'include'>) {
  //   return from(this.journalheaderRepository.find(filter)).pipe(
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

  // @MessagePattern('journalheader.paginate')
  // public index(@Payload() paginateDto: PaginationQueryDto) {
  //   return from(this.journalheaderService.paginate(paginateDto)).pipe(
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

  // @MessagePattern('journalheader.detail')
  // public detail(@Payload('id') id: string) {
  //   return from(this.journalheaderService.detail(id)).pipe(
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

  // @MessagePattern('journalheader.destroy')
  // public destroy(@Payload('id') id: string) {
  //   return from(this.journalheaderService.destroy(id)).pipe(
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
  //   @Payload() updateJournalHeadersDto: UpdateJournalHeadersDto,
  // ) {
  //   return from(
  //     this.journalheaderService.update(id, updateJournalHeadersDto),
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
