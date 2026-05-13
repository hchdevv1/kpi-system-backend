import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//
// =========================
// BASE DTOs
// =========================
//

export class IdNameDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;
}

export class IdCodeNameDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;
}

export class GroupDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;
}

//
// =========================
// MASTER DATA
// =========================
//

export class UnitDto extends IdNameDto {
  @ApiPropertyOptional()
  symbol?: string;

  @ApiPropertyOptional()
  scale_factor?: string;

  @ApiProperty()
  is_percent!: boolean;
}

export class FrequencyDto extends IdNameDto {
  @ApiProperty()
  interval_value!: number;
}

export class ConditionOperatorDto extends IdNameDto {
  @ApiPropertyOptional()
  symbol?: string;
}

export class BenchmarkDto extends IdNameDto {
  @ApiPropertyOptional()
  targetValue?: number;
}

//
// =========================
// MAPPING DTOs
// =========================
//

export class StrategyDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  strategyGroup!: GroupDto;
}

export class OrganizationDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  organizationGroup!: GroupDto;
}

export class ServiceUnitDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  serviceunitGroup!: GroupDto;
}

export class SimpleDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  simpleGroup!: GroupDto;
}

//
// =========================
// FORMULA
// =========================
//

export class FormulaDto {
  @ApiPropertyOptional()
  numerator?: string;

  @ApiPropertyOptional()
  denominator?: string;

  @ApiPropertyOptional()
  multiplier?: number;
}

//
// =========================
// USER UPDATE
// =========================
//

export class UserUpdateDto {
  @ApiPropertyOptional()
  userId?: number;

  @ApiPropertyOptional()
  usercode?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  roleId?: number;

  @ApiPropertyOptional()
  roleDescription?: string;

  @ApiPropertyOptional()
  updatedAt?: Date;
}

//
// =========================
// LATEST RESULT
// =========================
//

export class LatestResultDto {
  @ApiProperty()
  month!: number;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  numeratorValue!: number;

  @ApiPropertyOptional()
  denominatorValue?: number;

  @ApiProperty()
  calculatedValue!: number;

  @ApiPropertyOptional({
  description: 'Current KPI evaluation status',
  example: true,
})
  currentPassStatus?: boolean;
}

//
// =========================
// FINAL RESPONSE ITEM
// =========================
//

export class KpiResultListResponseDto {
  @ApiProperty()
  id!: number;

  // =========================
  // KPI STATIC
  // =========================

  @ApiProperty({ type: IdNameDto })
  topic!: IdNameDto;

  @ApiProperty()
  kpiYear!: number;

  @ApiProperty({ type: FrequencyDto })
  frequency!: FrequencyDto;

  @ApiProperty({ type: UnitDto })
  unit!: UnitDto;

  @ApiPropertyOptional({ type: ConditionOperatorDto })
  conditionOperator?: ConditionOperatorDto;

  @ApiPropertyOptional({ type: FormulaDto })
  formula?: FormulaDto;

  @ApiPropertyOptional()
  targetValue?: number;

  @ApiPropertyOptional({ type: BenchmarkDto })
  benchmark?: BenchmarkDto;

  // =========================
  // MAPPINGS
  // =========================

  @ApiProperty({ type: [StrategyDto] })
  strategies?: StrategyDto[];

  @ApiProperty({ type: [OrganizationDto] })
  organizations?: OrganizationDto[];

  @ApiProperty({ type: [ServiceUnitDto] })
  serviceUnits?: ServiceUnitDto[];

  @ApiProperty({ type: [SimpleDto] })
  simples?: SimpleDto[];

  // =========================
  // USER UPDATE
  // =========================

  @ApiPropertyOptional({ type: UserUpdateDto })
  userUpdate?: UserUpdateDto;

  // =========================
  // LATEST KPI VALUE
  // =========================

  @ApiPropertyOptional({ type: LatestResultDto })
  latestResult?: LatestResultDto;

  // =========================
  // STATUS
  // =========================

 
  @ApiPropertyOptional({
  description: 'KPI evaluation status',
  example: true,
})
  isPass?: boolean;
}