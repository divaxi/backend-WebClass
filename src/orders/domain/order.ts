import { Customer } from '../../customers/domain/customer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../../order-item/domain/order-item';
import { OrderStatusEnum } from '../statuses.enum';

export class Order {
  @ApiProperty({
    type: () => Customer,
    nullable: false,
  })
  customer: Customer;

  @ApiProperty({
    type: () => [OrderItem],
    nullable: false,
  })
  item: OrderItem[];

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalAmount: number;

  @ApiProperty({
    enum: OrderStatusEnum,
    enumName: 'OrderStatusEnum',
    nullable: false,
    description: 'Trạng thái đơn hàng trong lịch sử thay đổi',
    example: OrderStatusEnum.NEW_PENDING,
  })
  status: OrderStatusEnum;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  deliveredDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  expectedDeliveryDate?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  orderDate?: Date;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  deliveryAddress: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  orderCode: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
