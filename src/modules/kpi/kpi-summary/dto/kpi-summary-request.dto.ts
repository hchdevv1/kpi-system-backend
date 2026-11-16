
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  MaxLength,
} from 'class-validator';

export enum KpiSummaryTab {
  STRATEGY = 'strategy',
  ORGANIZATION = 'organization',
  SIMPLE = 'simple',
  PCT = 'pct',
  COE = 'coe',
  LOCATION = 'location',
}

export class KpiSummaryRequestDto {
  @ApiProperty({ enum: KpiSummaryTab, example: 'strategy' })
  @IsEnum(KpiSummaryTab)
  tab!: KpiSummaryTab;

  @ApiProperty({ example: 2026, description: 'KPI year (CE)' })
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  year!: number;

  @ApiPropertyOptional({ example: 'อัตราการเสียชีวิต' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  kpiSearch?: string;

  @ApiPropertyOptional({ example: 1 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.STRATEGY)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  strategyId?: number;

  @ApiPropertyOptional({ example: 2 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.STRATEGY)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  strategyObjectId?: number;

  @ApiPropertyOptional({ example: 1 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.ORGANIZATION)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  organizationId?: number;

  @ApiPropertyOptional({ example: 2 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.ORGANIZATION)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  organizationSubId?: number;

  @ApiPropertyOptional({ example: 1 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.SIMPLE)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  simpleGroupId?: number;

  @ApiPropertyOptional({ example: 2 })
  @ValidateIf((o: KpiSummaryRequestDto) => o.tab === KpiSummaryTab.SIMPLE)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  simpleId?: number;

  @ApiPropertyOptional({ example: 1 })
  @ValidateIf((o: KpiSummaryRequestDto) =>
    [KpiSummaryTab.PCT, KpiSummaryTab.COE, KpiSummaryTab.LOCATION].includes(o.tab),
  )
  @Type(() => Number)
  @IsInt()
  @Min(1)
  serviceUnitId?: number;
}
