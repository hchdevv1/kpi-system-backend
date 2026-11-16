import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class MonthlyKpiResultRequestDto {
  @ApiProperty({
    example: 28,
    description: 'KPI Definition ID',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  kpiDefinitionId!: number;

  @ApiProperty({
    example: 2026,
    description: 'Year of monthly KPI results',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  year!: number;
}
