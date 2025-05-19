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
import { OrderItem } from '../../order-item/domain/order-item';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: () => [OrderItem],
  })
  @ValidateNested()
  @Type(() => OrderItem)
  @IsArray()
  item: OrderItem[];

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
