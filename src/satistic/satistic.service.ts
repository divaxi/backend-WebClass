import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { EnumerateByEnum, EnumerateCountOrderDto } from './dto/count-order.dto';
@Injectable()
export class SatisticService {
  constructor(private readonly orderService: OrdersService) {}

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
}
