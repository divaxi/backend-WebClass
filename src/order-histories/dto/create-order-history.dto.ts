import { UserDto } from '../../users/dto/user.dto';

import { OrderDto } from '../../orders/dto/order.dto';

import {
  // decorators here

  IsString,
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
    required: true,
    type: () => String,
  })
  @IsString()
  status: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
