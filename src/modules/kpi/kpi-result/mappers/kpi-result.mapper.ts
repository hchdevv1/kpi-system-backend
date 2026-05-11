/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';
import { KpiDataEntry } from '../../kpi-data-entry/entities/kpi-data-entry.entity';

import { KpiResultListItemDto } from '../dto/kpi-result-list-item.dto';

import { KpiResultCalculator } from '../utils/kpi-result-calculator.util';

export class KpiResultMapper {

  static toResponse(
    entity: KpiDefinition,
    latestEntry?: KpiDataEntry,

    userRoleMap?: Map<
      string,
      {
        roleId: number;
        roleDescription: string;
      }
    >,

    userUpdate?: any,
  ): KpiResultListItemDto {

    // =========================
    // CALCULATE RESULT
    // =========================
    const calc = KpiResultCalculator.calculate(
      latestEntry?.numeratorValue ?? 0,

      latestEntry?.denominatorValue ?? null,

      entity.unit?.scale_factor
        ? Number(entity.unit.scale_factor)
        : 1,
    );

    // =========================
    // FIND ROLE INFO
    // =========================
    const roleKey =
      latestEntry?.updatedBy
        ? `${entity.id}-${latestEntry.updatedBy}`
        : '';

    const roleInfo =
      roleKey && userRoleMap
        ? userRoleMap.get(roleKey)
        : undefined;

    return {
      id: entity.id,

      // =========================
      // KPI INFO
      // =========================
      topic: entity.topic && {
        id: entity.topic.id,
        description: entity.topic.description,
      },

      kpiYear: entity.kpi_year,

      frequency: entity.frequency && {
        id: entity.frequency.id,
        description: entity.frequency.description,
        interval_value: entity.frequency.interval_value,
      },

      unit: entity.unit && {
        id: entity.unit.id,
        description: entity.unit.description,

        symbol:
          entity.unit.symbol ?? undefined,

        scale_factor:
          entity.unit.scale_factor ?? undefined,

        is_percent:
          entity.unit.is_percent,
      },

      conditionOperator:
        entity.conditionOperator && {
          id: entity.conditionOperator.id,

          description:
            entity.conditionOperator.description,

          symbol:
            entity.conditionOperator.symbol
              ?? undefined,
        },

      formula: {
        numerator: entity.numerator,

        denominator: entity.denominator,

        multiplier: entity.multiplier,
      },

      targetValue: entity.targetValue,

      benchmark: entity.benchmark && {
        id: entity.benchmark.id,

        description:
          entity.benchmark.description,

        targetValue:
          entity.benchmark_target_value,
      },

      // =========================
      // STRATEGIES
      // =========================
      strategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.strategy.id,

          code: m.strategy.code,

          description:
            m.strategy.description,

          strategyGroup:
            m.strategy.strategyGroup && {
              id: m.strategy.strategyGroup.id,

              code:
                m.strategy.strategyGroup.code,

              description:
                m.strategy.strategyGroup.description,
            },
        })) ?? [],

      // =========================
      // ORGANIZATIONS
      // =========================
      organizations:
        entity.kpiOrganizations?.map((m) => ({
          id: m.organization.id,

          code: m.organization.code,

          description:
            m.organization.description,

          organizationGroup:
            m.organization.organizationGroup && {
              id:
                m.organization.organizationGroup.id,

              code:
                m.organization.organizationGroup.code,

              description:
                m.organization.organizationGroup.description,
            },
        })) ?? [],

      // =========================
      // SERVICE UNITS
      // =========================
      serviceUnits:
        entity.kpiServiceUnits?.map((m) => ({
          id: m.serviceUnit.id,

          code: m.serviceUnit.code,

          description:
            m.serviceUnit.description,

          serviceunitGroup:
            m.serviceUnit.serviceUnitGroup && {
              id:
                m.serviceUnit.serviceUnitGroup.id,

              code:
                m.serviceUnit.serviceUnitGroup.code,

              description:
                m.serviceUnit.serviceUnitGroup.description,
            },
        })) ?? [],

      // =========================
      // SIMPLES
      // =========================
      simples:
        entity.kpiSimples?.map((m) => ({
          id: m.simple.id,

          code: m.simple.code,

          description:
            m.simple.description,

          simpleGroup:
            m.simple.kpisimplegroup && {
              id:
                m.simple.kpisimplegroup.id,

              code:
                m.simple.kpisimplegroup.code,

              description:
                m.simple.kpisimplegroup.description,
            },
        })) ?? [],

      // =========================
      // USER UPDATE
      // =========================
      userupdate: userUpdate ?? {
        userId:
          latestEntry?.updatedByUser?.id ?? 0,

        usercode:
          latestEntry?.updatedByUser?.usercode
          ?? '',

        description:
          latestEntry?.updatedByUser?.description
          ?? '',

        roleId:
          roleInfo?.roleId ?? 0,

        roleDescription:
          roleInfo?.roleDescription ?? '',
      },

      // =========================
      // LATEST RESULT
      // =========================
      latestResult: {
        month:
          latestEntry?.kpiDefMonth ?? 0,

        year:
          latestEntry?.kpiDefYear
          ?? entity.kpi_year,

        numeratorValue:
          latestEntry?.numeratorValue ?? 0,

        denominatorValue:
          latestEntry?.denominatorValue
          ?? undefined,

        calculatedValue:
          calc.calculatedValue,

        pass:
          calc.pass,
      },
    };
  }

  static toResponseList(
    entities: KpiDefinition[],

    latestMap: Map<number, KpiDataEntry>,

    userRoleMap: Map<
      string,
      {
        roleId: number;
        roleDescription: string;
      }
    >,
  ): KpiResultListItemDto[] {

    return entities.map((e) =>
      this.toResponse(
        e,
        latestMap.get(e.id),
        userRoleMap,
      ),
    );
  }
}