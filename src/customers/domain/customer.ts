import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  note?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  address: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
