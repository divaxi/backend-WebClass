import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { EnumerateByEnum, EnumerateCountOrderDto } from './dto/count-order.dto';
import { OrderStatusEnum } from '../orders/statuses.enum';
import { CustomersService } from '../customers/customers.service';
@Injectable()
export class SatisticService {
  constructor(
    private readonly orderService: OrdersService,
    private readonly customerService: CustomersService,
  ) {}

  async countOrderByTime(searchQuery: EnumerateCountOrderDto) {
    switch (searchQuery.enumerateBy) {
      case EnumerateByEnum.DAY:
        return this.orderService.countDayByDay(searchQuery);
      case EnumerateByEnum.MONTH:
        return this.orderService.countMonthByMonth(searchQuery);
      case EnumerateByEnum.YEAR:
        return this.orderService.countYearByYear(searchQuery);
      default:
        throw new BadRequestException('Invalid enumerateBy');
    }
  }

  totalRevenue(searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>) {
    return this.orderService.revenueTotalByQuery(searchQuery);
  }

  totalOrder(searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>) {
    return this.orderService.countTotalByQuery(searchQuery);
  }

  totalOrderEachStatus(
    searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy' | 'status'>,
  ) {
    const status = Object.values(OrderStatusEnum);
    return status.map((status) => {
      return this.orderService.countTotalByQuery({
        ...searchQuery,
        status: status.toString(),
      });
    });
  }

  totalCustomer(searchQuery: Omit<EnumerateCountOrderDto, 'enumerateBy'>) {
    return this.customerService.countTotalByQuery(searchQuery);
  }
}
