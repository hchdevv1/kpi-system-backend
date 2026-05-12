import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//
// 🔹 Base DTOs
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
export class UnitResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiPropertyOptional()
  symbol?: string;

  @ApiPropertyOptional()
  scale_factor?: string;

  @ApiProperty()
  is_percent!: boolean;
}

export class FrequencyResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  interval_value!: number;
}
export class ConditionOperatorResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;

  @ApiPropertyOptional()
  symbol?: string;
}
//
// 🔹 Mapping DTOs
//
export class StrategyResponseDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  strategyGroup!: GroupDto;
}

export class OrganizationResponseDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  organizationGroup!: GroupDto;
}

export class ServiceUnitResponseDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  serviceunitGroup!: GroupDto;
}

export class SimpleResponseDto extends IdCodeNameDto {
  @ApiProperty({ type: GroupDto })
  simpleGroup!: GroupDto;
}

//
// 🔹 Formula DTO
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
// 🔹 Benchmark DTO
//
export class BenchmarkDto extends IdNameDto {
  @ApiPropertyOptional()
  targetValue?: number;
}

//
// 🔹 User Role DTO
//
export class UserRoleResponseDto {
  @ApiProperty()
  userId!: number;

  @ApiProperty({ example: 'Mr XX XXXX' })
  description?: string;

  @ApiProperty()
  roleId!: number;
}

//
// 🔹 Final Response DTO
//
export class CreateKpiDefinitionResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: IdNameDto })
  topic!: IdNameDto;

  @ApiProperty()
  kpiYear!: number;

  @ApiPropertyOptional()
  kpiStartDate?: string;

  @ApiPropertyOptional({ type: IdNameDto })
  measure?: IdNameDto;

  @ApiProperty({ type: FrequencyResponseDto })
  frequency?: FrequencyResponseDto;

  @ApiProperty({ type: UnitResponseDto })
  unit?: UnitResponseDto;

  @ApiPropertyOptional({ type: ConditionOperatorResponseDto })
  conditionOperator?: ConditionOperatorResponseDto;

  @ApiProperty({ type: FormulaDto })
  formula!: FormulaDto;

  @ApiPropertyOptional()
  targetValue?: number;

  @ApiPropertyOptional()
  previousYearValue?: number;

  @ApiPropertyOptional({ type: BenchmarkDto })
  benchmark?: BenchmarkDto;

  @ApiPropertyOptional({ example: 95.5 })
  benchmarkTargetValue?: number;

  @ApiProperty({ type: [StrategyResponseDto] })
  strategies!: StrategyResponseDto[];

  @ApiProperty({ type: [OrganizationResponseDto] })
  organizations!: OrganizationResponseDto[];

  @ApiProperty({ type: [ServiceUnitResponseDto] })
  serviceUnits!: ServiceUnitResponseDto[];

  @ApiProperty({ type: [SimpleResponseDto] })
  simples!: SimpleResponseDto[];

  @ApiProperty({ type: [UserRoleResponseDto] })
  userRoles!: UserRoleResponseDto[];

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}