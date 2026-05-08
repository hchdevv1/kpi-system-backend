import { KpiDirectory } from '../entities/kpi-directory.entity';
import { KpiResponseDto } from '../dto/kpi-response.dto';

export class KpiMapper {

  // =========================
  // RESPONSE (DETAIL / CREATE RETURN)
  // =========================
  static toResponse(entity: KpiDirectory): KpiResponseDto {
    return {
      id: entity.id,
      year: entity.kpi_year,
      kpiStartDate: entity.kpiStartDate,

      // 🔥 NEW (แทน strategy เดิม)
      kpiStrategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.id,
          strategy: {
            id: m.strategy.id,
            code: m.strategy.code,
            description: m.strategy.description,
            strategyGroup: m.strategy.strategyGroup
              ? {
                  id: m.strategy.strategyGroup.id,
                  code: m.strategy.strategyGroup.code,
                  description: m.strategy.strategyGroup.description,
                }
              : undefined,
          },
        })) ?? [],

      organization: entity.organization && {
        id: entity.organization.id,
        description: entity.organization.description,
      },

      frequency: entity.frequency && {
        id: entity.frequency.id,
        description: entity.frequency.description,
      },

      benchmark: entity.benchmark && {
        id: entity.benchmark.id,
        description: entity.benchmark.description,
      },

      conditionOperator: entity.conditionOperator && {
        id: entity.conditionOperator.id,
        description: entity.conditionOperator.description,
      },

      unit: entity.unit && {
        id: entity.unit.id,
        description: entity.unit.description,
      },

      serviceUnits:
        entity.serviceUnits?.map((su) => ({
          id: su.serviceUnit.id,
          description: su.serviceUnit.description,
        })) ?? [],

      simpleMappings:
        entity.simpleMappings?.map((s) => ({
          id: s.simple.id,
          description: s.simple.description,
        })) ?? [],
    };
  }

  // =========================
  // BASE MAPPER
  // =========================
  static base(entity: KpiDirectory) {
    return {
      id: entity.id,
      year: entity.kpi_year,

      // 🔥 NEW
      kpiStrategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.id,
          strategy: {
            id: m.strategy.id,
            code: m.strategy.code,
            description: m.strategy.description,
            strategyGroup: m.strategy.strategyGroup
              ? {
                  id: m.strategy.strategyGroup.id,
                  code: m.strategy.strategyGroup.code,
                  description: m.strategy.strategyGroup.description,
                }
              : null,
          },
        })) ?? [],

      organization: entity.organization
        ? {
            id: entity.organization.id,
            description: entity.organization.description,
          }
        : null,

      frequency: entity.frequency
        ? {
            id: entity.frequency.id,
            description: entity.frequency.description,
          }
        : null,

      unit: entity.unit
        ? {
            id: entity.unit.id,
            description: entity.unit.description,
          }
        : null,

      conditionOperator: entity.conditionOperator
        ? {
            id: entity.conditionOperator.id,
            description: entity.conditionOperator.description,
          }
        : null,

      benchmark: entity.benchmark
        ? {
            id: entity.benchmark.id,
            description: entity.benchmark.description,
          }
        : null,

      simpleMappings:
        entity.simpleMappings?.map((s) => ({
          id: s.simple.id,
          code: s.simple.code,
          description: s.simple.description,
        })) ?? [],

      serviceUnits:
        entity.serviceUnits?.map((su) => ({
          id: su.serviceUnit.id,
          code: su.serviceUnit.code,
          description: su.serviceUnit.description,
        })) ?? [],

      previousYearValue: entity.previousYearValue,
      targetValue: entity.targetValue,
    };
  }

  // =========================
  // LIST
  // =========================
  static toListResponse(entity: KpiDirectory) {
    return {
      topic: entity.topic
        ? {
            id: entity.topic.id,
            description: entity.topic.description,
          }
        : null,

      ...this.base(entity),
    };
  }

  static toListResponseArray(entities: KpiDirectory[]) {
    return entities.map((e) => this.toListResponse(e));
  }
}