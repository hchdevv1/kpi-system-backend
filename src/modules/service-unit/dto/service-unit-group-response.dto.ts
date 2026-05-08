/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';

export class ServiceUnitGroupResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'SG001' })
  code!: string;

  @ApiProperty({ example: 'PCT' })
  description!: string;

}