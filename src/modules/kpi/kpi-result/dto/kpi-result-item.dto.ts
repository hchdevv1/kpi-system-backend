import { ApiProperty } from '@nestjs/swagger';

export class KpiResultItemDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  kpiYear!: number;

  // =========================
  // TOPIC
  // =========================
  @ApiProperty()
  topic!: {
    id: number;
    description: string;
  };

  // =========================
  // FREQUENCY
  // =========================
  @ApiProperty()
  frequency!: {
    id: number;
    description: string;
    interval_value: number;
  };

  // =========================
  // UNIT
  // =========================
  @ApiProperty()
  unit!: {
    id: number;
    description: string;
    scale_factor?: string;
    is_percent: boolean;
  };

  // =========================
  // CONDITION
  // =========================
  @ApiProperty()
  conditionOperator!: {
    id: number;
    description: string;
    symbol?: string;
  };

  // =========================
  // FORMULA
  // =========================
  @ApiProperty()
  formula!: {
    numerator?: string;
    denominator?: string;
    multiplier?: number;
  };

  @ApiProperty()
  targetValue?: number;

  // =========================
  // BENCHMARK
  // =========================
  @ApiProperty()
  benchmark?: {
    id: number;
    description: string;
    targetValue?: number;
  };

  // =========================
  // GROUPS
  // =========================
  @ApiProperty()
  strategies!: any[];

  @ApiProperty()
  organizations!: any[];

  @ApiProperty()
  serviceUnits!: any[];

  @ApiProperty()
  simples!: any[];

  // =========================
  // USER UPDATE
  // =========================
  @ApiProperty()
  userupdate!: {
    userId: number;
    usercode: string;
    description: string;
    roleId: number;
   
  };

  // =========================
  // LATEST RESULT
  // =========================
  @ApiProperty()
  latestResult!: {
    month: number;
    year: number;

    numeratorValue: number;
    denominatorValue?: number;

    calculatedValue: number;

    pass: boolean;
  };
}