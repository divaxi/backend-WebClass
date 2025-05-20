import { UsersModule } from '../users/users.module';
import { OrdersModule } from '../orders/orders.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderHistoriesService } from './order-histories.service';
import { OrderHistoriesController } from './order-histories.controller';
import { DocumentOrderHistoryPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    UsersModule,

    OrdersModule,

    // do not remove this comment
    DocumentOrderHistoryPersistenceModule,
  ],
  controllers: [OrderHistoriesController],
  providers: [OrderHistoriesService],
  exports: [OrderHistoriesService, DocumentOrderHistoryPersistenceModule],
})
export class OrderHistoriesModule {}
