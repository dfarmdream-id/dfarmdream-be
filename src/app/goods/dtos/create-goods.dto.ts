import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum TipeBarang {
  PAKAN,
  OBAT,
}
export class CreateGoodsDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    description: 'Mohon pilih tipe barang antara PAKAN atau OBAT',
    enum: TipeBarang,
    enumName: 'TipeBarang',
  })
  @IsEnum(TipeBarang)
  typeLedger: TipeBarang;
}
