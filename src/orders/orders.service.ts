import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';

@Injectable()
export class OrdersService {
  constructor(
    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.create({
      item: createOrderDto.item,

      totalAmount: createOrderDto.totalAmount,

      status: createOrderDto.status,

      deliveredDate: createOrderDto.deliveredDate,

      expectedDeliveryDate: createOrderDto.expectedDeliveryDate,

      orderDate: createOrderDto.orderDate,

      deliveryAddress: createOrderDto.deliveryAddress,

      orderCode: createOrderDto.orderCode,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      item: updateOrderDto.item,

      totalAmount: updateOrderDto.totalAmount,

      status: updateOrderDto.status,

      deliveredDate: updateOrderDto.deliveredDate,

      expectedDeliveryDate: updateOrderDto.expectedDeliveryDate,

      orderDate: updateOrderDto.orderDate,

      deliveryAddress: updateOrderDto.deliveryAddress,

      orderCode: updateOrderDto.orderCode,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
