import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import { OrdersService } from '../orders/orders.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';
import { OrderHistoryRepository } from './infrastructure/persistence/order-history.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderHistory } from './domain/order-history';
import { Order } from '../orders/domain/order';

@Injectable()
export class OrderHistoriesService {
  constructor(
    private readonly userService: UsersService,

    private readonly orderService: OrdersService,

    // Dependencies here
    private readonly orderHistoryRepository: OrderHistoryRepository,
  ) {}

  async create(createOrderHistoryDto: CreateOrderHistoryDto) {
    // Do not remove comment below.
    // <creating-property />
    const changeByUserObject = await this.userService.findById(
      createOrderHistoryDto.changeByUser.id,
    );
    if (!changeByUserObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          changeByUser: 'notExists',
        },
      });
    }
    const changeByUser = changeByUserObject;

    const orderObject = await this.orderService.findById(
      createOrderHistoryDto.order.id,
    );
    if (!orderObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          order: 'notExists',
        },
      });
    }
    const order = orderObject;

    return this.orderHistoryRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      changeByUser,

      order,

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
    let changeByUser: User | undefined = undefined;

    if (updateOrderHistoryDto.changeByUser) {
      const changeByUserObject = await this.userService.findById(
        updateOrderHistoryDto.changeByUser.id,
      );
      if (!changeByUserObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            changeByUser: 'notExists',
          },
        });
      }
      changeByUser = changeByUserObject;
    }

    let order: Order | undefined = undefined;

    if (updateOrderHistoryDto.order) {
      const orderObject = await this.orderService.findById(
        updateOrderHistoryDto.order.id,
      );
      if (!orderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            order: 'notExists',
          },
        });
      }
      order = orderObject;
    }

    return this.orderHistoryRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      changeByUser,

      order,

      status: updateOrderHistoryDto.status,
    });
  }

  remove(id: OrderHistory['id']) {
    return this.orderHistoryRepository.remove(id);
  }
}
