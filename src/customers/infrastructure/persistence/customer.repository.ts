import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Customer } from '../../domain/customer';
import { SearchDto } from '../../dto/find-all-customers.dto';
import { EnumerateCountOrderDto } from '../../../satistic/dto/count-order.dto';
import { TotalResponseDto } from '../../../satistic/dto/satistic.dto';
export abstract class CustomerRepository {
  abstract create(
    data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Customer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }): Promise<Customer[]>;

  abstract findById(id: Customer['id']): Promise<NullableType<Customer>>;

  abstract findByIds(ids: Customer['id'][]): Promise<Customer[]>;

  abstract countTotalByQuery(
    searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>,
  ): Promise<TotalResponseDto>;

  abstract update(
    id: Customer['id'],
    payload: DeepPartial<Customer>,
  ): Promise<Customer | null>;

  abstract remove(id: Customer['id']): Promise<void>;
}
