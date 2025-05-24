import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/domain/customer';
import {
  // common
  HttpStatus,
  UnprocessableEntityException,
  Injectable,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { SearchDto } from './dto/find-all-orders.dto';
import { randomBytes } from 'crypto';
import { addDays } from 'date-fns';
import { OrderStatusEnum } from './statuses.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly customerService: CustomersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const customerObject = await this.customerService.findById(
      createOrderDto.customer.id,
    );
    if (!customerObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          customer: 'notExists',
        },
      });
    }

    const orderCode = randomBytes(5).toString('hex');
    const expectedDeliveryDate = addDays(new Date(), 5);
    return this.orderRepository.create({
      customer: customerObject,

      item: createOrderDto.item,

      totalAmount: createOrderDto.totalAmount,

      status: OrderStatusEnum.NEW_PENDING,

      deliveredDate: createOrderDto.deliveredDate,

      expectedDeliveryDate,

      orderDate: createOrderDto.orderDate,

      deliveryAddress: createOrderDto.deliveryAddress,

      orderCode,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions<SearchDto>;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
        search: paginationOptions.search,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  countDayByDay(query: Omit<SearchDto, 'code'>) {
    return this.orderRepository.countDayByDay(query);
  }

  countMonthByMonth(query: Omit<SearchDto, 'code'>) {
    return this.orderRepository.countMonthByMonth(query);
  }

  countYearByYear(query: Omit<SearchDto, 'code'>) {
    return this.orderRepository.countYearByYear(query);
  }

  countTotalByQuery(query: Omit<SearchDto, 'code'>) {
    return this.orderRepository.countTotalByQuery(query);
  }

  revenueTotalByQuery(query: Omit<SearchDto, 'code'>) {
    return this.orderRepository.revenueTotalByQuery(query);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let customer: Customer | undefined = undefined;

    if (updateOrderDto.customer) {
      const customerObject = await this.customerService.findById(
        updateOrderDto.customer.id,
      );
      if (!customerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            customer: 'notExists',
          },
        });
      }
      customer = customerObject;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      customer,

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
