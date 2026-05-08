/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';

export class XStrategyGroupResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'STG001' })
  code!: string;

  @ApiProperty({ example: 'Strategy' })
  description!: string;

}