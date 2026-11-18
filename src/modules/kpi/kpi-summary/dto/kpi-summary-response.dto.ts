
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class KpiSummaryMasterDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiPropertyOptional({ example: 'STG001', nullable: true })
  code?: string | null;

  @ApiProperty({ example: 'Strategy' })
  description!: string;
}

export class KpiSummaryOwnerDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '6110189' })
  usercode!: string;

  @ApiProperty({ example: 'Example User' })
  description!: string;
}

export class KpiSummaryPeriodDto {
  @ApiProperty({ example: 2025 })
  year!: number;

  @ApiProperty({ example: null, nullable: true })
  result!: number | null;
}

export class KpiSummaryMonthlyResultDto {
  @ApiProperty({ example: 1, description: 'Month number (1-12)' })
  month!: number;

  @ApiProperty({ example: null, nullable: true })
  result!: number | null;
}

export class KpiSummaryQuarterlyResultDto {
  @ApiProperty({ example: 1, description: 'Quarter number (1-4)' })
  quarter!: number;

  @ApiProperty({ example: null, nullable: true })
  result!: number | null;
}

/**
 * KPI Formula
 */
export class KpiSummaryFormulaDto {
  @ApiProperty({
    example: 'Numerator description',
    nullable: true,
  })
  numerator!: string | null;

  @ApiProperty({
    example: 'Denominator description',
    nullable: true,
  })
  denominator!: string | null;

  @ApiProperty({
    example: 100,
    nullable: true,
  })
  multiplier!: number | null;
}

export class KpiSummaryResponseItemDto {
  @ApiProperty({
    example: 1106,
    description: 'KPI definition ID',
  })
  id!: number;

  @ApiProperty({ type: KpiSummaryMasterDto })
  kpi!: KpiSummaryMasterDto;

  @ApiProperty({ type: KpiSummaryFormulaDto })
  formula!: KpiSummaryFormulaDto;

  @ApiProperty({ example: 2026 })
  year!: number;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  strategy?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  strategyObject?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  goal?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  organization?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  organizationSub?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  simpleGroup?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  simpleSubGroup?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  serviceUnitGroup?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    type: KpiSummaryMasterDto,
    nullable: true,
  })
  serviceUnit?: KpiSummaryMasterDto | null;

  @ApiPropertyOptional({
    example: 'Monthly',
    nullable: true,
  })
  frequency?: string | null;

  @ApiPropertyOptional({
    example: 1.5,
    nullable: true,
  })
  benchmark?: number | string | null;

  @ApiPropertyOptional({
    example: 2,
    nullable: true,
  })
  target?: number | string | null;

  @ApiProperty({ type: [KpiSummaryOwnerDto] })
  owner!: KpiSummaryOwnerDto[];

  @ApiProperty({ type: KpiSummaryPeriodDto })
  previousYear!: KpiSummaryPeriodDto;

  @ApiProperty({ type: [KpiSummaryMonthlyResultDto] })
  monthlyResults!: KpiSummaryMonthlyResultDto[];

  @ApiProperty({ type: [KpiSummaryQuarterlyResultDto] })
  quarterlyResults!: KpiSummaryQuarterlyResultDto[];

  @ApiProperty({ example: null, nullable: true })
  halfYearResult!: number | null;

  @ApiProperty({ example: null, nullable: true })
  totalResult!: number | null;
}

export class KpiSummaryPaginationMetaDto {
  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 100 })
  total!: number;
}

export class KpiSummaryResponseDto {
  @ApiProperty({ type: [KpiSummaryResponseItemDto] })
  items!: KpiSummaryResponseItemDto[];

  @ApiProperty({ type: KpiSummaryPaginationMetaDto })
  meta!: KpiSummaryPaginationMetaDto;
}
