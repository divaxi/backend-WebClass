import { User } from '../../users/domain/user';
import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';

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
    type: () => String,
    nullable: false,
  })
  status: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
