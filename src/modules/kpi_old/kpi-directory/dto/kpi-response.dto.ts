import { ApiProperty } from '@nestjs/swagger';

class RefDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;
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

  @ApiProperty({ required: false })
  strategyGroup?: StrategyGroupDto;
}

// =========================
// KPI STRATEGY MAPPING
// =========================
class KpiStrategyDto {
  @ApiProperty() id!: number;

  @ApiProperty({ type: StrategyDto })
  strategy!: StrategyDto;
}
export class KpiResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  kpiStartDate?: string;

@ApiProperty({ type: [KpiStrategyDto], required: false })
kpiStrategies?: KpiStrategyDto[];

  @ApiProperty({ type: RefDto, nullable: true })
  organization?: RefDto;

  @ApiProperty({ type: RefDto })
  frequency!: RefDto;

  @ApiProperty({ type: RefDto })
  unit!: RefDto;

  @ApiProperty({ type: RefDto, nullable: true })
  conditionOperator?: RefDto;

  @ApiProperty({ type: RefDto, nullable: true })
  benchmark?: RefDto;

  @ApiProperty({ type: [RefDto] })
  serviceUnits!: RefDto[];

  @ApiProperty({ type: [RefDto] })
  simpleMappings!: RefDto[];
}