// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateOrderHistoryDto } from './create-order-history.dto';

export class UpdateOrderHistoryDto extends PartialType(CreateOrderHistoryDto) {}
