/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsArray,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// =========================
// NESTED DTO: USER ROLE
// =========================
export class CreateKpiUserRoleDto {
  @ApiProperty({ example: 10, description: 'User ID' })
  @IsInt()
  userRefId!: number;

  @ApiProperty({ example: 1, description: 'Role ID (Owner/Inputer/Viewer)' })
  @IsInt()
  roleRefId!: number;
}

// =========================
// MAIN DTO
// =========================
export class CreateKpiDto {
  // =========================
  // CORE
  // =========================

  @ApiProperty({ example: 1, description: 'Topic reference ID' })
  @IsInt()
  topicRefId!: number;

  @ApiProperty({ example: 2026, description: 'KPI year' })
  @IsInt()
  year!: number;

@ApiPropertyOptional({ example: '2026-05-01', description: 'Kpi start date'})
  @IsString()
  kpiStartDate!:string;
  // =========================
  // CONTEXT
  // =========================

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  strategyRefId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  organizationRefId?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  measureRefId?: number;

  // =========================
  // CONFIG
  // =========================

  @ApiProperty({ example: 1, description: 'Frequency ID (Monthly/Quarterly)' })
  @IsInt()
  frequencyRefId!: number;

  @ApiProperty({ example: 1, description: 'Unit ID (%) / count' })
  @IsInt()
  unitRefId!: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Condition Operator ID (>, >=, =, <, <=)',
  })
  @IsOptional()
  @IsInt()
  conditionOperatorRefId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  benchmarkRefId?: number;

  // =========================
  // FORMULA
  // =========================

  @ApiPropertyOptional({
    example: 'infected_case',
    description: 'Numerator formula / field',
  })
  @IsOptional()
  @IsString()
  numerator?: string;

  @ApiPropertyOptional({
    example: 'total_case',
    description: 'Denominator formula / field',
  })
  @IsOptional()
  @IsString()
  denominator?: string;

  @ApiPropertyOptional({
    example: 100,
    description: 'Multiplier เช่น % = 100',
  })
  @IsOptional()
  @IsNumber()
  multiplier?: number;

  // =========================
  // TARGET
  // =========================

  @ApiPropertyOptional({ example: 5, description: 'Target KPI value' })
  @IsOptional()
  @IsNumber()
  targetValue?: number;

  @ApiPropertyOptional({ example: 4.5 })
  @IsOptional()
  @IsNumber()
  previousYearValue?: number;

  // =========================
  // RELATIONS
  // =========================

  @ApiPropertyOptional({
    example: [1, 2],
    description: 'Service Unit IDs (multi-select)',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  serviceUnitRefIds?: number[];

  @ApiPropertyOptional({
    example: [1, 3],
    description: 'KPI Simple IDs (multi-select)',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  simpleRefIds?: number[];

  @ApiPropertyOptional({
    type: [CreateKpiUserRoleDto],
    description: 'User roles for this KPI',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKpiUserRoleDto)
  userRoles?: CreateKpiUserRoleDto[];

   @ApiProperty({ example: 'true' })
   @IsOptional()
  is_active?: boolean;

}