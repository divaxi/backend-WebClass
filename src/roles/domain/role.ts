import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = String;

export class Role {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  name?: string;
}
