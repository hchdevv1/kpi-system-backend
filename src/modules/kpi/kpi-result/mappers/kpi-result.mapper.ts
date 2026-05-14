/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';

import {
  KpiResultListResponseDto,
  UnitDto,
  ConditionOperatorDto,
  FrequencyDto,
} from '../dto/kpi-result-list-response.dto';

import { LatestResultMap } from '../types/kpi-result.types';

export class KpiResultMapper {
  static toResponseList(
    entities: KpiDefinition[],
    latestMap: LatestResultMap,
  ): KpiResultListResponseDto[] {
    return entities.map((e) => this.toResponse(e, latestMap));
  }

  static toResponse(
    entity: KpiDefinition,
    latestMap: LatestResultMap,
  ): KpiResultListResponseDto {
    const latest = latestMap.get(entity.id);

    const yearlyCalculated = latest?.yearlyCalculated ?? 0;

    return {
      id: entity.id,

      // =========================
      // KPI STATIC
      // =========================

      topic: entity.topic,

      kpiYear: entity.kpi_year,

      frequency: {
        id: entity.frequency.id,
        description: entity.frequency.description,
        interval_value: entity.frequency.interval_value,
      } as FrequencyDto,

      unit: {
        id: entity.unit.id,
        description: entity.unit.description,
        symbol: entity.unit.symbol ?? undefined,
        scale_factor: entity.unit.scale_factor ?? undefined,
        is_percent: entity.unit.is_percent,
      } as UnitDto,

      conditionOperator: entity.conditionOperator
        ? ({
            id: entity.conditionOperator.id,
            description: entity.conditionOperator.description,
            symbol: entity.conditionOperator.symbol ?? undefined,
          } as ConditionOperatorDto)
        : undefined,

      formula: {
        numerator: entity.numerator,
        denominator: entity.denominator,
        multiplier: entity.multiplier,
      },

      targetValue: entity.targetValue,

      benchmark: entity.benchmark
        ? {
            id: entity.benchmark.id,
            description: entity.benchmark.description,
            targetValue: entity.benchmark_target_value,
          }
        : undefined,

      // =========================
      // MAPPINGS
      // =========================

      strategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.strategy.id,
          code: m.strategy.code,
          description: m.strategy.description,
          strategyGroup: m.strategy.strategyGroup,
        })) ?? [],

      organizations:
        entity.kpiOrganizations?.map((m) => ({
          id: m.organization.id,
          code: m.organization.code,
          description: m.organization.description,
          organizationGroup: m.organization.organizationGroup,
        })) ?? [],

      serviceUnits:
        entity.kpiServiceUnits?.map((m) => ({
          id: m.serviceUnit.id,
          code: m.serviceUnit.code,
          description: m.serviceUnit.description,
          serviceunitGroup: m.serviceUnit.serviceUnitGroup,
        })) ?? [],

      simples:
        entity.kpiSimples?.map((m) => ({
          id: m.simple.id,
          code: m.simple.code,
          description: m.simple.description,
          simpleGroup: m.simple.kpisimplegroup,
        })) ?? [],

      // =========================
      // USER UPDATE
      // =========================

      userUpdate: latest?.entry?.updatedByUser
  ? {
      userId: latest.entry.updatedByUser.id,

      usercode:
        latest.entry.updatedByUser.usercode,

      description:
        latest.entry.updatedByUser.description,

      roleId: entity.userRoles?.[0]?.role?.id,

      roleDescription:
        entity.userRoles?.[0]?.role?.description,

      updatedAt: latest.entry.updated_at,
    }
  : undefined,

      // =========================
      // LATEST RESULT
      // =========================

      latestResult: latest?.month
        ? {
            month: latest.month,
            year: latest.year!,
            numeratorValue: latest.numeratorValue!,
            denominatorValue: latest.denominatorValue,
            calculatedValue: latest.calculatedValue!,
            currentPassStatus: latest.currentPassStatus,
          }
        : undefined,

      // =========================
      // YEAR STATUS
      // =========================

      isPass:
        yearlyCalculated >=
        (entity.targetValue ?? 0),
    };
  }
}