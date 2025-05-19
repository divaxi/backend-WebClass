import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class OrderItem {
  @IsString()
  @ApiProperty({
    type: () => String,
    example: 'World smallest violin',
  })
  productName: string;

  @IsNumber()
  @ApiProperty({
    type: () => Number,
    example: 2,
  })
  quantity: number;

  @IsNumber()
  @ApiProperty({
    type: () => Number,
    example: 50000,
  })
  unitPrice: number;
}
