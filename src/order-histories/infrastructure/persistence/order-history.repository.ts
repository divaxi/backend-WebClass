import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderHistory } from '../../domain/order-history';

export abstract class OrderHistoryRepository {
  abstract create(
    data: Omit<OrderHistory, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderHistory>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderHistory[]>;

  abstract findById(
    id: OrderHistory['id'],
  ): Promise<NullableType<OrderHistory>>;

  abstract findByIds(ids: OrderHistory['id'][]): Promise<OrderHistory[]>;

  abstract update(
    id: OrderHistory['id'],
    payload: DeepPartial<OrderHistory>,
  ): Promise<OrderHistory | null>;

  abstract remove(id: OrderHistory['id']): Promise<void>;
}
