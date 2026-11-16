import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt ,IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryKpiDefinitionDto {
  @ApiPropertyOptional({ example: 2026 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  year?: number;

  @ApiPropertyOptional({
  example: 'strategy',
  enum: ['strategy', 'organization', 'simple', 'PCT', 'CoE', 'Location'],
})
@IsOptional()
kpiGroup?: 'strategy' | 'organization' | 'simple' | 'PCT' | 'CoE' | 'Location';

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  measureRefId?: number;

@ApiPropertyOptional({
  description: 'User code for filtering KPI visibility',
  example: '6110189',
})
@IsOptional()
@IsString()
usercode?: string;

  // =========================
  // PAGINATION
  // =========================
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 1;
}