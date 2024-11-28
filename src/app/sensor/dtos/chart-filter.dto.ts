import { ApiProduces, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional } from "class-validator";

export class ChartFilterDTO{
    @ApiPropertyOptional()
    @IsOptional()
    tanggal?:string

    @ApiPropertyOptional()
    @IsOptional()
    siteId?:string

    @ApiPropertyOptional()
    @IsOptional()
    cageId?:string
}

export class PaginatedChartFilterDTO{
    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    page: number;
  
    @ApiPropertyOptional()
    @IsNumberString()
    @IsOptional()
    limit: number;

    @ApiPropertyOptional()
    @IsOptional()
    tanggal?:string

    @ApiPropertyOptional()
    @IsOptional()
    siteId?:string

    @ApiPropertyOptional()
    @IsOptional()
    cageId?:string
}