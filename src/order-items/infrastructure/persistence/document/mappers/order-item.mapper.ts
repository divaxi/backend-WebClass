import { OrderItem } from '../../../../domain/order-item';
import { OrderMapper } from '../../../../../orders/infrastructure/persistence/document/mappers/order.mapper';

import { OrderItemSchemaClass } from '../entities/order-item.schema';

export class OrderItemMapper {
  public static toDomain(raw: OrderItemSchemaClass): OrderItem {
    const domainEntity = new OrderItem();
    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    }

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.quantity = raw.quantity;

    domainEntity.productName = raw.productName;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: OrderItem): OrderItemSchemaClass {
    const persistenceSchema = new OrderItemSchemaClass();
    if (domainEntity.order) {
      persistenceSchema.order = OrderMapper.toPersistence(domainEntity.order);
    }

    persistenceSchema.unitPrice = domainEntity.unitPrice;

    persistenceSchema.quantity = domainEntity.quantity;

    persistenceSchema.productName = domainEntity.productName;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
