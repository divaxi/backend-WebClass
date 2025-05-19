import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OrderHistoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
