import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderItemSchema,
  OrderItemSchemaClass,
} from './entities/order-item.schema';
import { OrderItemRepository } from '../order-item.repository';
import { OrderItemDocumentRepository } from './repositories/order-item.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderItemSchemaClass.name, schema: OrderItemSchema },
    ]),
  ],
  providers: [
    {
      provide: OrderItemRepository,
      useClass: OrderItemDocumentRepository,
    },
  ],
  exports: [OrderItemRepository],
})
export class DocumentOrderItemPersistenceModule {}
