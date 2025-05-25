import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { parseISO } from 'date-fns';

export enum EnumerateByEnum {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export class EnumerateCountOrderDto {
  @ApiPropertyOptional()
  @IsEnum(EnumerateByEnum)
  @IsOptional()
  enumerateBy: EnumerateByEnum;

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
