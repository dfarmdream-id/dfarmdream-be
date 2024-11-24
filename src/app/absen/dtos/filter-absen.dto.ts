import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FilterAbsenDTO{
    @ApiPropertyOptional()
    @IsOptional()
    search?:string

    @ApiPropertyOptional()
    @IsOptional()
    lokasi?:string

    @ApiPropertyOptional()
    @IsOptional()
    kandang?:string

    @ApiPropertyOptional()
    @IsOptional()
    tanggal?:Date

    @ApiPropertyOptional({default:1})
    @IsOptional()
    page?:number

    @ApiPropertyOptional({default:10})
    @IsOptional()
    limit?:number
}