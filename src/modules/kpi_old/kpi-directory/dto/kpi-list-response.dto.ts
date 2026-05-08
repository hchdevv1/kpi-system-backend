import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';


class IdDescriptionDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;
}
class StrategyGroupDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;
}
class StrategyDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;

  @ApiProperty({ type: StrategyGroupDto, required: false })
  strategyGroup?: StrategyGroupDto;
}


class KpiStrategyDto {
  @ApiProperty() id!: number;

  @ApiProperty({ type: StrategyDto })
  strategy!: StrategyDto;
}


class CodeDescriptionDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;
}

export class KpiListItemDto {
  // =========================
  // CORE
  // =========================
  @ApiProperty()
  id!: number;

  @ApiProperty()
  is_active!: boolean;
  @ApiProperty()
  year!: number;
 @ApiProperty()
  kpiStartDate?: string;

  @ApiProperty({ type: IdDescriptionDto })
  topic!: IdDescriptionDto;

  // =========================
  // METRICS
  // =========================
  @ApiProperty({ required: false })
  targetValue?: number | string;

  @ApiProperty({ required: false })
  previousYearValue?: number | string;

  // =========================
  // RELATION
  // =========================
 @ApiProperty({ type: [KpiStrategyDto], required: false })
  kpiStrategies?: KpiStrategyDto[];

  @ApiProperty({ type: IdDescriptionDto, required: false })
  organization?: IdDescriptionDto;

  @ApiProperty({ type: IdDescriptionDto, required: false })
  unit?: IdDescriptionDto;

  @ApiProperty({ type: IdDescriptionDto, required: false })
  frequency?: IdDescriptionDto;

  @ApiProperty({ type: IdDescriptionDto, required: false })
  conditionOperator?: IdDescriptionDto;

  @ApiProperty({ type: IdDescriptionDto, required: false })
  benchmark?: IdDescriptionDto;

  // =========================
  // MAPPING
  // =========================
  @ApiProperty({ type: [CodeDescriptionDto], required: false })
  simpleMappings?: CodeDescriptionDto[];

  @ApiProperty({ type: [CodeDescriptionDto], required: false })
  serviceUnits?: CodeDescriptionDto[];
}

export class KpiListResponseDto {
  @ApiProperty({ type: [KpiListItemDto] })
  items!: KpiListItemDto[];

  @ApiProperty()
  meta!: PaginationMetaDto;
}