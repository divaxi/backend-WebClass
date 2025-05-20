import {
  // common
  Module,
} from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { CustomersModule } from '../customers/customers.module';
import { SatisticService } from './satistic.service';
import { SatisticController } from './satistic.contoller';
@Module({
  imports: [
    // import modules, etc.
    OrdersModule,
    CustomersModule,
  ],
  providers: [SatisticService],
  exports: [SatisticService],
  controllers: [SatisticController],
})
export class SatisticModule {}
