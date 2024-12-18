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
import { PricesService } from 'src/app/prices/services';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreatePricesDto, UpdatePricesDto } from 'src/app/prices/dtos';
import { ApiTags } from '@nestjs/swagger';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';
import { GetPricesDto } from '../../dtos/get-prices.dto';
import { User } from '@src/app/auth/decorators';
import { AuthGuard } from '@src/app/auth';

@ApiTags('Prices')
@Controller({
  path: 'price',
  version: '1',
})
export class PricesHttpController {
  constructor(private readonly priceService: PricesService) {}

  @Post()
  public async create(
    @Body() createPricesDto: CreatePricesDto,
  ) {
    try{
      const data = await this.priceService.create(createPricesDto)
      return new ResponseEntity({data, message:'success'})
    }catch(e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  public index(@Query() paginateDto: GetPricesDto): Observable<ResponseEntity> {
    return this.priceService.paginate(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get('log/:id')
  public getPriceLog(@Query() paginateDto:GetPricesDto):Observable<ResponseEntity>{
    return this.priceService.getLogData(paginateDto).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Get(':id')
  public detail(@Param('id') id: string): Observable<ResponseEntity> {
    return this.priceService.detail(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }),
    );
  }

  @Delete(':id')
  public destroy(@Param('id') id: string): Observable<ResponseEntity> {
    return this.priceService.destroy(id).pipe(
      map((data) => new ResponseEntity({ data, message: 'success' })),
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id') id: string,
    @Body() updatePricesDto: UpdatePricesDto,
    @User() user: { id: string; },
  ) {
    console.log("user : ", user)
    try{
      const data = await this.priceService.update(id, updatePricesDto, user.id!)
      return new ResponseEntity({data, message:'success'})
    }catch(e){
      console.log("Failed to update price : ",e)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
