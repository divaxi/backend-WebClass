import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerSchema,
  CustomerSchemaClass,
} from './entities/customer.schema';
import { CustomerRepository } from '../customer.repository';
import { CustomerDocumentRepository } from './repositories/customer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerSchemaClass.name, schema: CustomerSchema },
    ]),
  ],
  providers: [
    {
      provide: CustomerRepository,
      useClass: CustomerDocumentRepository,
    },
  ],
  exports: [CustomerRepository],
})
export class DocumentCustomerPersistenceModule {}
