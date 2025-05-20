import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SatisticService } from './satistic.service';
import { EnumerateCountOrderDto } from './dto/count-order.dto';
import { TotalResponseDto } from './dto/satistic.dto';
import { TotalOrderDto } from './dto/total-order.dto';
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
    type: EnumerateCountOrderDto,
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
}
