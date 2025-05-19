import { OrdersModule } from '../orders/orders.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { DocumentOrderItemPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    forwardRef(() => OrdersModule),

    // do not remove this comment
    DocumentOrderItemPersistenceModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService, DocumentOrderItemPersistenceModule],
})
export class OrderItemsModule {}
