import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CoasRepository, type Filter } from 'src/app/coas/repositories';
import { CoasService } from 'src/app/coas/services';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { ResponseEntity } from 'src/common/entities/response.entity';
import { CreateCoasDto, UpdateCoasDto } from 'src/app/coas/dtos';
import { map, catchError, from } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Coas')
@Controller({
  path: 'coa',
  version: '1',
})
export class CoasMicroserviceController {
  constructor(
    private readonly coaService: CoasService,
    private readonly coaRepository: CoasRepository,
  ) {}

  @MessagePattern('coa.create')
  public create(@Payload() createCoasDto: CreateCoasDto) {
    return from(this.coaService.create(createCoasDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => { 
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('coa.find')
  public find(@Payload() filter: Omit<Filter, 'include'>) {
    return from(this.coaRepository.find(filter)).pipe(
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('coa.paginate')
  public index(@Payload() paginateDto: PaginationQueryDto) {
    return from(this.coaService.paginate(paginateDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('coa.detail')
  public detail(@Payload('id') id: string) {
    return from(this.coaService.detail(id)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern('coa.destroy')
  public destroy(@Payload('id') id: string) {
    return from(this.coaService.destroy(id)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }

  @MessagePattern(':id')
  public update(
    @Payload('id') id: string,
    @Payload() updateCoasDto: UpdateCoasDto,
  ) {
    return from(this.coaService.update(id, updateCoasDto)).pipe(
      map(data => new ResponseEntity({
        data,
        message: 'success',
      })),
      catchError(error => {
        throw new RpcException(new ResponseEntity({
          status: HttpStatus.BAD_REQUEST,
          message: error.message
        }));
      }),
    );
  }
}

