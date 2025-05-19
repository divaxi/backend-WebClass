import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty({
    type: () => Order,
    nullable: false,
  })
  order: Order;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  unitPrice: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  quantity: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  productName: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
