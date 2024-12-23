import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum TipeBarang {
  PAKAN = 'PAKAN',
  OBAT = 'OBAT',
  ASSET = 'ASSET',
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
  type: TipeBarang;
}
