import { CustomerDto } from '../../customers/dto/customer.dto';

import {
  // decorators here

  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmptyObject,
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
import { OrderStatusEnum } from '../statuses.enum';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: () => CustomerDto,
  })
  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmptyObject()
  customer: CustomerDto;

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

  status?: OrderStatusEnum;

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
