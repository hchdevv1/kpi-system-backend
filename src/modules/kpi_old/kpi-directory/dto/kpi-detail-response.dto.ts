import { ApiProperty } from '@nestjs/swagger';

// =========================
// BASE DTO
// =========================

class IdDescriptionDto {
  @ApiProperty() id!: number;
  @ApiProperty() description!: string;
}

class IdCodeDescriptionDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;
}

// =========================
// STRATEGY GROUP
// =========================

class StrategyGroupDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;
}

// =========================
// STRATEGY
// =========================

class StrategyDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;

  @ApiProperty({ type: StrategyGroupDto, required: false })
  strategyGroup?: StrategyGroupDto;
}

// =========================
// KPI STRATEGY (MAPPING)
// =========================

class KpiStrategyDto {
  @ApiProperty() id!: number;

  @ApiProperty({ type: StrategyDto })
  strategy!: StrategyDto;
}

// =========================
// USER ROLE
// =========================

class UserRoleDto {
  @ApiProperty() userRefId!: number;
  @ApiProperty() userName!: string;

  @ApiProperty() roleRefId!: number;
  @ApiProperty() roleName!: string;
}

// =========================
// MAIN DTO
// =========================

export class KpiDetailItemDto {
  @ApiProperty() id!: number;

  @ApiProperty() is_active!: boolean;

  @ApiProperty({ type: IdDescriptionDto })
  topic!: IdDescriptionDto;

  @ApiProperty() year!: number;

  @ApiProperty() kpiStartDate?: string;

  @ApiProperty() targetValue?: number;
  @ApiProperty() previousYearValue?: number;

  @ApiProperty() numerator?: string;
  @ApiProperty() denominator?: string;
  @ApiProperty() multiplier?: number;

  // 🔥 NEW (สำคัญ)
  @ApiProperty({ type: [KpiStrategyDto], required: false })
  kpiStrategies?: KpiStrategyDto[];

  @ApiProperty({ required: false })
  organization?: IdDescriptionDto;

  @ApiProperty({ type: [IdCodeDescriptionDto] })
  simpleMappings!: IdCodeDescriptionDto[];

  @ApiProperty({ type: [IdCodeDescriptionDto] })
  serviceUnits!: IdCodeDescriptionDto[];

  @ApiProperty({ required: false })
  unit?: IdDescriptionDto;

  @ApiProperty({ required: false })
  frequency?: IdDescriptionDto;

  @ApiProperty({ required: false })
  conditionOperator?: IdDescriptionDto;

  @ApiProperty({ required: false })
  benchmark?: IdDescriptionDto;

  @ApiProperty({ type: [UserRoleDto] })
  userRoles?: UserRoleDto[];
}