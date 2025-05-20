import { OrderHistory } from '../../../../domain/order-history';
import { UserMapper } from '../../../../../users/infrastructure/persistence/document/mappers/user.mapper';

import { OrderMapper } from '../../../../../orders/infrastructure/persistence/document/mappers/order.mapper';

import { OrderHistorySchemaClass } from '../entities/order-history.schema';

export class OrderHistoryMapper {
  public static toDomain(raw: OrderHistorySchemaClass): OrderHistory {
    const domainEntity = new OrderHistory();
    if (raw.changeByUser) {
      domainEntity.changeByUser = UserMapper.toDomain(raw.changeByUser);
    }

    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    }

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
    if (domainEntity.changeByUser) {
      persistenceSchema.changeByUser = UserMapper.toPersistence(
        domainEntity.changeByUser,
      );
    }

    if (domainEntity.order) {
      persistenceSchema.order = OrderMapper.toPersistence(domainEntity.order);
    }

    persistenceSchema.status = domainEntity.status;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
