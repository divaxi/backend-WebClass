import {
  // decorators here

  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  note?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
