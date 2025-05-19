import { ApiProperty } from '@nestjs/swagger';

export class OrderHistory {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
