import { UsersService } from '../users/users.service';

import { OrdersService } from '../orders/orders.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { OrderHistoryRepository } from './infrastructure/persistence/order-history.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderHistory } from './domain/order-history';
import { SearchDto } from './dto/find-all-order-histories.dto';

@Injectable()
export class OrderHistoriesService {
  constructor(
    private readonly userService: UsersService,

    private readonly orderService: OrdersService,

    private readonly orderHistoryRepository: OrderHistoryRepository,
  ) {}

  async create(createOrderHistoryDto: CreateOrderHistoryDto) {
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

    const orderObject = await this.orderService.update(
      createOrderHistoryDto.order.id,
      { status: createOrderHistoryDto.status },
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
      changeByUser,

      order,

      status: createOrderHistoryDto.status,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }) {
    return this.orderHistoryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        search: paginationOptions.search,
      },
    });
  }

  findById(id: OrderHistory['id']) {
    return this.orderHistoryRepository.findById(id);
  }

  findByIds(ids: OrderHistory['id'][]) {
    return this.orderHistoryRepository.findByIds(ids);
  }
}
