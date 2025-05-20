import { User } from '../../users/domain/user';
import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../orders/statuses.enum';

export class OrderHistory {
  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  changeByUser: User;

  @ApiProperty({
    type: () => Order,
    nullable: false,
  })
  order: Order;

  @ApiProperty({
    enum: OrderStatusEnum,
    enumName: 'OrderStatusEnum',
    nullable: false,
    description: 'Trạng thái đơn hàng trong lịch sử thay đổi',
    example: OrderStatusEnum.NEW_PENDING,
  })
  status: OrderStatusEnum;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
