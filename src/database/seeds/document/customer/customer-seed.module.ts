import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerSchema,
  CustomerSchemaClass,
} from '../../../../customers/infrastructure/persistence/document/entities/customer.schema';
import { CustomerSeedService } from './customer-seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CustomerSchemaClass.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  providers: [CustomerSeedService],
  exports: [CustomerSeedService],
})
export class CustomerSeedModule {}
