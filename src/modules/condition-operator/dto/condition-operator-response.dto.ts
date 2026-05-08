/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ConditionOperatorResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'C001' })
  code!: string;

  @ApiProperty({ example: 'มากกว่า' })
  description!: string;

  @IsOptional()
  @ApiProperty({ example: ' > ' })
  symbol?: string | null;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}