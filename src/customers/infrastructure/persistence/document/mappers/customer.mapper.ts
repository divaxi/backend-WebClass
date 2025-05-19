import { Customer } from '../../../../domain/customer';

import { CustomerSchemaClass } from '../entities/customer.schema';

export class CustomerMapper {
  public static toDomain(raw: CustomerSchemaClass): Customer {
    const domainEntity = new Customer();
    domainEntity.note = raw.note;

    domainEntity.address = raw.address;

    domainEntity.email = raw.email;

    domainEntity.phone = raw.phone;

    domainEntity.name = raw.name;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Customer): CustomerSchemaClass {
    const persistenceSchema = new CustomerSchemaClass();
    persistenceSchema.note = domainEntity.note;

    persistenceSchema.address = domainEntity.address;

    persistenceSchema.email = domainEntity.email;

    persistenceSchema.phone = domainEntity.phone;

    persistenceSchema.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
