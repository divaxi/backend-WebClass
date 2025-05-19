import { OrderItem } from '../../order-items/domain/order-item';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
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
    type: () => String,
    nullable: false,
  })
  status?: string;

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
