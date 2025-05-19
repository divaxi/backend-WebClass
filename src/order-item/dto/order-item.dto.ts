import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OrderItemDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
