import { Order } from '../../../../domain/order';
import { CustomerMapper } from '../../../../../customers/infrastructure/persistence/document/mappers/customer.mapper';

import { OrderSchemaClass } from '../entities/order.schema';

export class OrderMapper {
  public static toDomain(raw: OrderSchemaClass): Order {
    const domainEntity = new Order();
    if (raw.customer) {
      domainEntity.customer = CustomerMapper.toDomain(raw.customer);
    }

    domainEntity.item = raw.item;

    domainEntity.totalAmount = raw.totalAmount;

    domainEntity.status = raw.status;

    domainEntity.deliveredDate = raw.deliveredDate;

    domainEntity.expectedDeliveryDate = raw.expectedDeliveryDate;

    domainEntity.orderDate = raw.orderDate;

    domainEntity.deliveryAddress = raw.deliveryAddress;

    domainEntity.orderCode = raw.orderCode;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Order): OrderSchemaClass {
    const persistenceSchema = new OrderSchemaClass();
    if (domainEntity.customer) {
      persistenceSchema.customer = CustomerMapper.toPersistence(
        domainEntity.customer,
      );
    }

    persistenceSchema.item = domainEntity.item;

    persistenceSchema.totalAmount = domainEntity.totalAmount;

    persistenceSchema.status = domainEntity.status;

    persistenceSchema.deliveredDate = domainEntity.deliveredDate;

    persistenceSchema.expectedDeliveryDate = domainEntity.expectedDeliveryDate;

    persistenceSchema.orderDate = domainEntity.orderDate;

    persistenceSchema.deliveryAddress = domainEntity.deliveryAddress;

    persistenceSchema.orderCode = domainEntity.orderCode;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
