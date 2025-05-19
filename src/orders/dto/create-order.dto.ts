import { OrderItemDto } from '../../order-items/dto/order-item.dto';

import {
  // decorators here

  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: () => [OrderItemDto],
  })
  @ValidateNested()
  @Type(() => OrderItemDto)
  @IsArray()
  item: OrderItemDto[];

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalAmount: number;

  status?: string;

  deliveredDate?: Date | null;

  expectedDeliveryDate?: Date | null;

  orderDate?: Date;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  deliveryAddress: string;

  orderCode: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
