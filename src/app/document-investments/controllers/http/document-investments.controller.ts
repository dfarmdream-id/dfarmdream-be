import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DocumentInvestmentsService } from 'src/app/document-investments/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import {
  CreateDocumentInvestmentsDto,
  UpdateDocumentInvestmentsDto,
} from 'src/app/document-investments/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { GetDocumentInvestmentDto } from '../../dtos/get-document-investment.dto';

@ApiTags('DocumentInvestments')
@Controller({
  path: 'document-investment',
  version: '1',
})
export class DocumentInvestmentsHttpController {
  constructor(
    private readonly documentinvestmentService: DocumentInvestmentsService,
  ) {}

  @Post()
  public create(
    @Body() createDocumentInvestmentsDto: CreateDocumentInvestmentsDto,
  ): Observable<ResponseEntity> {
    return this.documentinvestmentService
      .create(createDocumentInvestmentsDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }

  @Get()
  public index(
    @Query() paginateDto: GetDocumentInvestmentDto,
  ): Observable<ResponseEntity> {
    return this.documentinvestmentService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.documentinvestmentService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    console.log('Delete Id :', id);
    return this.documentinvestmentService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateDocumentInvestmentsDto: UpdateDocumentInvestmentsDto,
  ): Observable<ResponseEntity> {
    return this.documentinvestmentService
      .update(id, updateDocumentInvestmentsDto)
      .pipe(
        map((data) => new ResponseEntity({ data, message: 'success' })),
        catchError((error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}
