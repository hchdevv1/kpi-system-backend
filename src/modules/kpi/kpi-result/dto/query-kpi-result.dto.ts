import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsOptional,
  IsInt,
  IsBoolean,
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

  @ApiPropertyOptional({
    example: false,
    description: 'Privilege Admin? ',
  })
  
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiPropertyOptional({
    example: 2,
    description: 'usersystem role id? ',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  usersystem_role_id?: number;


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