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
  UseGuards,
} from '@nestjs/common';
import { InvestorsService } from 'src/app/investors/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateInvestorsDto, UpdateInvestorsDto } from 'src/app/investors/dtos';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthGuard } from '@src/app/auth';

@ApiSecurity('JWT')
@ApiTags('Investors')
@Controller({
  path: 'investor',
  version: '1',
})
export class InvestorsHttpController {
  constructor(private readonly investorService: InvestorsService) {}

  @UseGuards(AuthGuard)
  @Post()
  public create(
    @Body() createInvestorsDto: CreateInvestorsDto,
  ): Observable<ResponseEntity> {
    return this.investorService.create(createInvestorsDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  public index(
    @Query() paginateDto: PaginationQueryDto,
  ): Observable<ResponseEntity> {
    return this.investorService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.investorService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.investorService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  public update(
    @Param('id') id: string,
    @Body() updateInvestorsDto: UpdateInvestorsDto,
  ): Observable<ResponseEntity> {
    return this.investorService.update(id, updateInvestorsDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }
}
