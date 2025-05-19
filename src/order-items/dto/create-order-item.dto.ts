import { OrderDto } from '../../orders/dto/order.dto';

import {
  // decorators here

  IsString,
  IsNumber,
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

export class CreateOrderItemDto {
  @ApiProperty({
    required: true,
    type: () => OrderDto,
  })
  @ValidateNested()
  @Type(() => OrderDto)
  @IsNotEmptyObject()
  order: OrderDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  productName: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
