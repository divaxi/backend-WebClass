import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrderHistorySchema,
  OrderHistorySchemaClass,
} from './entities/order-history.schema';
import { OrderHistoryRepository } from '../order-history.repository';
import { OrderHistoryDocumentRepository } from './repositories/order-history.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderHistorySchemaClass.name, schema: OrderHistorySchema },
    ]),
  ],
  providers: [
    {
      provide: OrderHistoryRepository,
      useClass: OrderHistoryDocumentRepository,
    },
  ],
  exports: [OrderHistoryRepository],
})
export class DocumentOrderHistoryPersistenceModule {}
