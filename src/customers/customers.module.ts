import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DocumentCustomerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentCustomerPersistenceModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, DocumentCustomerPersistenceModule],
})
export class CustomersModule {}
