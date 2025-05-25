import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { parseISO } from 'date-fns';

export class TotalOrderDto {
  @ApiProperty()
  @Transform(({ value }) => (value instanceof Date ? value : parseISO(value)))
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }) => (value instanceof Date ? value : parseISO(value)))
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}

export class TotalOrderEachStatusDto {
  @ApiProperty()
  @Transform(({ value }) => (value instanceof Date ? value : parseISO(value)))
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }) => (value instanceof Date ? value : parseISO(value)))
  @IsDate()
  endDate: Date;
}
