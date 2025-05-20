import { ApiProperty } from '@nestjs/swagger';

interface StatisticData {
  count: number;
  revenue: number;
}

export class DayByDay implements StatisticData {
  @ApiProperty({ type: Number })
  day: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class MonthByMonth implements StatisticData {
  @ApiProperty({ type: Number })
  month: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class YearByYear implements StatisticData {
  @ApiProperty({ type: Number })
  year: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  revenue: number;
}

export class EnumerateResponseDto<T> {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Array })
  data: T[];
}

export class TotalResponseDto {
  @ApiProperty({ type: Number })
  total: number;
}
