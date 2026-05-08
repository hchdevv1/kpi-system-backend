import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateKpiDataEntryDto {
  @ApiProperty({
    example: 1,
    description: 'KPI Definition ID',
  })
  @IsInt()
  @IsNotEmpty()
  kpiDefinitionId!: number;

  @ApiProperty({
    example: 2026,
    description: 'KPI reporting year',
  })
  @IsInt()
  @IsNotEmpty()
  kpiDefYear!: number;

  @ApiProperty({
    example: 5,
    description: 'KPI reporting month (1-12)',
  })
  @IsInt()
  @Min(1)
  @Max(12)
  kpiDefMonth!: number;

  @ApiProperty({
    example: 95,
    description: 'Numerator value',
  })
  @IsNumber()
  numeratorValue!: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Denominator value',
  })
  @IsOptional()
  @IsNumber()
  denominatorValue?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  userId!: number;
}