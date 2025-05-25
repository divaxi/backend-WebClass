import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderSchema,
  OrderSchemaClass,
} from '../../../../orders/infrastructure/persistence/document/entities/order.schema';
import { OrderSeedService } from './order-seed.service';
import {
  CustomerSchema,
  CustomerSchemaClass,
} from '../../../../customers/infrastructure/persistence/document/entities/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderSchemaClass.name,
        schema: OrderSchema,
      },
      {
        name: CustomerSchemaClass.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [OrderSeedService],
  exports: [OrderSeedService],
})
export class OrderSeedModule {}
