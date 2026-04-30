/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber,IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PagingWithSearchQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;
@ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 4;
  @ApiPropertyOptional({ example: 'kpi' })
  @IsOptional()
  @IsString()
  search?: string;
}