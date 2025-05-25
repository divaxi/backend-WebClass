import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderHistorySchema,
  OrderHistorySchemaClass,
} from '../../../../order-histories/infrastructure/persistence/document/entities/order-history.schema';
import { OrderHistorySeedService } from './order-history-seed.service';
import {
  OrderSchema,
  OrderSchemaClass,
} from '../../../../orders/infrastructure/persistence/document/entities/order.schema';
import {
  UserSchema,
  UserSchemaClass,
} from '../../../../users/infrastructure/persistence/document/entities/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderHistorySchemaClass.name,
        schema: OrderHistorySchema,
      },
      {
        name: OrderSchemaClass.name,
        schema: OrderSchema,
      },
      {
        name: UserSchemaClass.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [OrderHistorySeedService],
  exports: [OrderHistorySeedService],
})
export class OrderHistorySeedModule {}
