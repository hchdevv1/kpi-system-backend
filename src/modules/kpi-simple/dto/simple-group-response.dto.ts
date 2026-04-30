/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';

export class SimpleGroupResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'KSG001' })
  code!: string;

  @ApiProperty({ example: 'Patient' })
  description!: string;

}