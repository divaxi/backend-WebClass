import { UserDto } from '../../users/dto/user.dto';

import { OrderDto } from '../../orders/dto/order.dto';

import {
  // decorators here

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
import { OrderStatusEnum } from '../../orders/statuses.enum';

export class CreateOrderHistoryDto {
  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  changeByUser: UserDto;

  @ApiProperty({
    required: true,
    type: () => OrderDto,
  })
  @ValidateNested()
  @Type(() => OrderDto)
  @IsNotEmptyObject()
  order: OrderDto;

  @ApiProperty({
    enum: OrderStatusEnum,
    enumName: 'OrderStatusEnum',
    required: true,
    description: 'Trạng thái đơn hàng trong lịch sử thay đổi',
    example: OrderStatusEnum.NEW_PENDING,
  })
  status: OrderStatusEnum;
}
