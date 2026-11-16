import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IdNameDto,
  UnitDto,
  ConditionOperatorDto,
  FormulaDto,
  BenchmarkDto,
  StrategyDto,
  OrganizationDto,
  ServiceUnitDto,
  SimpleDto,
} from './kpi-result-list-response.dto';

export class MonthlyKpiTopicDto extends IdNameDto {
  @ApiProperty()
  code!: string;

  @ApiPropertyOptional({ nullable: true })
  alias_code?: string | null;
}

export class MonthlyKpiDefinitionDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: MonthlyKpiTopicDto })
  topic!: MonthlyKpiTopicDto;

  @ApiProperty()
  kpiYear!: number;

  @ApiPropertyOptional()
  kpiStartDate?: string;

  @ApiPropertyOptional({ type: IdNameDto })
  measure?: IdNameDto;

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

  @ApiProperty({ type: [StrategyDto] })
  strategies!: StrategyDto[];

  @ApiProperty({ type: [OrganizationDto] })
  organizations!: OrganizationDto[];

  @ApiProperty({ type: [ServiceUnitDto] })
  serviceUnits!: ServiceUnitDto[];

  @ApiProperty({ type: [SimpleDto] })
  simples!: SimpleDto[];
}

export class MonthlyKpiAssignedUserDto {
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  usercode!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  roleId!: number;

  @ApiProperty()
  roleDescription!: string;
}

export class MonthlyKpiResultItemDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  kpiDefinitionId!: number;

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

  @ApiPropertyOptional()
  targetValue?: number;

  @ApiPropertyOptional({ type: ConditionOperatorDto })
  conditionOperator?: ConditionOperatorDto;

  @ApiProperty()
  currentPassStatus!: boolean;
}

export class MonthlyKpiResultResponseDto {
  @ApiProperty({ type: MonthlyKpiDefinitionDto })
  kpiDefinition!: MonthlyKpiDefinitionDto;

  @ApiProperty({ type: [MonthlyKpiAssignedUserDto] })
  assignedUsers!: MonthlyKpiAssignedUserDto[];

  @ApiProperty()
  year!: number;

  @ApiProperty({ type: [MonthlyKpiResultItemDto] })
  monthlyResults!: MonthlyKpiResultItemDto[];
}
