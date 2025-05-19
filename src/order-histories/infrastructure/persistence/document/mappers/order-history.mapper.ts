import { OrderHistory } from '../../../../domain/order-history';

import { OrderHistorySchemaClass } from '../entities/order-history.schema';

export class OrderHistoryMapper {
  public static toDomain(raw: OrderHistorySchemaClass): OrderHistory {
    const domainEntity = new OrderHistory();
    domainEntity.status = raw.status;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: OrderHistory,
  ): OrderHistorySchemaClass {
    const persistenceSchema = new OrderHistorySchemaClass();
    persistenceSchema.status = domainEntity.status;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
