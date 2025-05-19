import { OrderItemsModule } from '../order-items/order-items.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DocumentOrderPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    forwardRef(() => OrderItemsModule),

    // do not remove this comment
    DocumentOrderPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, DocumentOrderPersistenceModule],
})
export class OrdersModule {}
