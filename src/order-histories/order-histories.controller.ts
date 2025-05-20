import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderHistoriesService } from './order-histories.service';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderHistory } from './domain/order-history';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderHistoriesDto } from './dto/find-all-order-histories.dto';

@ApiTags('Orderhistories')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-histories',
  version: '1',
})
export class OrderHistoriesController {
  constructor(private readonly orderHistoriesService: OrderHistoriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderHistory,
  })
  create(@Body() createOrderHistoryDto: CreateOrderHistoryDto) {
    return this.orderHistoriesService.create(createOrderHistoryDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderHistory),
  })
  async findAll(
    @Query() query: FindAllOrderHistoriesDto,
  ): Promise<InfinityPaginationResponseDto<OrderHistory>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderHistoriesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderHistory,
  })
  findById(@Param('id') id: string) {
    return this.orderHistoriesService.findById(id);
  }
}
