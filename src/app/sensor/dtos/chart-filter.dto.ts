import { ApiProduces, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

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