import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';
import { OrderHistoryRepository } from './infrastructure/persistence/order-history.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderHistory } from './domain/order-history';

@Injectable()
export class OrderHistoriesService {
  constructor(
    // Dependencies here
    private readonly orderHistoryRepository: OrderHistoryRepository,
  ) {}

  async create(createOrderHistoryDto: CreateOrderHistoryDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.orderHistoryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status: createOrderHistoryDto.status,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderHistoryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderHistory['id']) {
    return this.orderHistoryRepository.findById(id);
  }

  findByIds(ids: OrderHistory['id'][]) {
    return this.orderHistoryRepository.findByIds(ids);
  }

  async update(
    id: OrderHistory['id'],

    updateOrderHistoryDto: UpdateOrderHistoryDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orderHistoryRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status: updateOrderHistoryDto.status,
    });
  }

  remove(id: OrderHistory['id']) {
    return this.orderHistoryRepository.remove(id);
  }
}
