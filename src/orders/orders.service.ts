import { OrderItemsService } from '../order-items/order-items.service';
import { OrderItem } from '../order-items/domain/order-item';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => OrderItemsService))
    private readonly orderItemService: OrderItemsService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    const itemObjects = await this.orderItemService.findByIds(
      createOrderDto.item.map((entity) => entity.id),
    );
    if (itemObjects.length !== createOrderDto.item.length) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          item: 'notExists',
        },
      });
    }
    const item = itemObjects;

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      item,

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
    let item: OrderItem[] | undefined = undefined;

    if (updateOrderDto.item) {
      const itemObjects = await this.orderItemService.findByIds(
        updateOrderDto.item.map((entity) => entity.id),
      );
      if (itemObjects.length !== updateOrderDto.item.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            item: 'notExists',
          },
        });
      }
      item = itemObjects;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      item,

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
