import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SatisticService } from './satistic.service';
import { EnumerateCountOrderDto } from './dto/count-order.dto';
import {
  DayByDay,
  EnumerateResponseDto,
  MonthByMonth,
  TotalOrderEachStatusResponseDto,
  TotalResponseDto,
  YearByYear,
} from './dto/satistic.dto';

import { TotalOrderDto, TotalOrderEachStatusDto } from './dto/total-order.dto';
@ApiTags('Satistic')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'satistic',
  version: '1',
})
export class SatisticController {
  constructor(private readonly satisticService: SatisticService) {}

  @Get('count-order')
  @ApiOkResponse({
    type: EnumerateResponseDto<DayByDay | MonthByMonth | YearByYear>,
  })
  countOrderByTime(@Query() query: EnumerateCountOrderDto) {
    return this.satisticService.countOrderByTime(query);
  }

  @Get('total-revenue')
  @ApiOkResponse({
    type: TotalResponseDto,
  })
  totalRevenue(@Query() query: TotalOrderDto) {
    return this.satisticService.totalRevenue(query);
  }

  @Get('total-order')
  @ApiOkResponse({
    type: TotalResponseDto,
  })
  totalOrder(@Query() query: TotalOrderDto) {
    return this.satisticService.totalOrder(query);
  }

  @Get('total-order-each-status')
  @ApiOkResponse({
    type: [TotalOrderEachStatusResponseDto],
  })
  totalOrderEachStatus(@Query() query: TotalOrderEachStatusDto) {
    return this.satisticService.totalOrderEachStatus(query);
  }

  @Get('total-user')
  @ApiOkResponse({
    type: TotalResponseDto,
  })
  totalCustomer(@Query() query: TotalOrderDto) {
    return this.satisticService.totalCustomer(query);
  }
}
