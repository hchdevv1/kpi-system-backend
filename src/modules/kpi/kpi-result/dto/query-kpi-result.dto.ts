import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsOptional,
  IsInt,
} from 'class-validator';

import { Type } from 'class-transformer';

export class QueryKpiResultDto {
  // =========================
  // FILTER
  // =========================

  @ApiPropertyOptional({
    example: 2026,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'User ID',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({
    example: 'strategy',
    enum: [
      'strategy',
      'organization',
      'simple',
      'PCT',
      'CoE',
      'Location',
    ],
  })
  @IsOptional()
  kpiGroup?:
    | 'strategy'
    | 'organization'
    | 'simple'
    | 'PCT'
    | 'CoE'
    | 'Location';

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  measureRefId?: number;

  // =========================
  // PAGINATION
  // =========================

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;
}