/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
export class XStrategyResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'SU001' })
  code!: string;

  @ApiProperty({ example: 'Med' })
  description!: string;

  @ApiProperty({ example: true })
  is_active?: boolean;
}