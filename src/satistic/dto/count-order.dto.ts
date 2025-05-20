import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

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
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status?: string;
}
