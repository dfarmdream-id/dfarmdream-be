import { Controller } from '@nestjs/common';
import { DocumentInvestmentsRepository } from 'src/app/document-investments/repositories';
import { DocumentInvestmentsService } from 'src/app/document-investments/services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('DocumentInvestments')
@Controller({
  path: 'documentinvestment',
  version: '1',
})
export class DocumentInvestmentsMicroserviceController {
  constructor(
    private readonly documentinvestmentService: DocumentInvestmentsService,
    private readonly documentinvestmentRepository: DocumentInvestmentsRepository,
  ) {}

  // @MessagePattern('documentinvestment.create')
  // public create(
  //   @Payload() createDocumentInvestmentsDto: CreateDocumentInvestmentsDto,
  // ) {
  //   return from(
  //     this.documentinvestmentService.create(createDocumentInvestmentsDto),
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

  // @MessagePattern('documentinvestment.find')
  // public find(@Payload() filter: Omit<Filter, 'include'>) {
  //   return from(this.documentinvestmentRepository.find(filter)).pipe(
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

  // @MessagePattern('documentinvestment.paginate')
  // public index(@Payload() paginateDto: PaginationQueryDto) {
  //   return from(this.documentinvestmentService.paginate(paginateDto)).pipe(
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

  // @MessagePattern('documentinvestment.detail')
  // public detail(@Payload('id') id: string) {
  //   return from(this.documentinvestmentService.detail(id)).pipe(
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

  // @MessagePattern('documentinvestment.destroy')
  // public destroy(@Payload('id') id: string) {
  //   return from(this.documentinvestmentService.destroy(id)).pipe(
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
  //   @Payload() updateDocumentInvestmentsDto: UpdateDocumentInvestmentsDto,
  // ) {
  //   return from(
  //     this.documentinvestmentService.update(id, updateDocumentInvestmentsDto),
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
