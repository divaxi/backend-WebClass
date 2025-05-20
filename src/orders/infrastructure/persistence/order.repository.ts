import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Order } from '../../domain/order';
import { SearchDto } from '../../dto/find-all-orders.dto';
import {
  DayByDay,
  EnumerateResponseDto,
  MonthByMonth,
  YearByYear,
  TotalResponseDto,
} from '../../../satistic/dto/satistic.dto';
export abstract class OrderRepository {
  abstract create(
    data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }): Promise<Order[]>;

  abstract findById(id: Order['id']): Promise<NullableType<Order>>;

  abstract findByIds(ids: Order['id'][]): Promise<Order[]>;

  abstract countDayByDay(
    query: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<DayByDay>>;

  abstract countMonthByMonth(
    query: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<MonthByMonth>>;

  abstract countYearByYear(
    query: Omit<SearchDto, 'code'>,
  ): Promise<EnumerateResponseDto<YearByYear>>;

  abstract countTotalByQuery(
    query: Omit<SearchDto, 'code'>,
  ): Promise<TotalResponseDto>;

  abstract revenueTotalByQuery(
    query: Omit<SearchDto, 'code'>,
  ): Promise<TotalResponseDto>;

  abstract update(
    id: Order['id'],
    payload: DeepPartial<Order>,
  ): Promise<Order | null>;

  abstract remove(id: Order['id']): Promise<void>;
}
