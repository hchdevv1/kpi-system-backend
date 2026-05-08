import { KpiDirectory } from '../entities/kpi-directory.entity';
import { KpiListItemDto } from '../dto/kpi-list-response.dto';

export class KpiListMapper {
  static toResponse(entity: KpiDirectory): KpiListItemDto {
    return {
      // =========================
      // CORE
      // =========================
      id: entity.id,
      is_active: entity.is_active,

      topic: entity.topic
        ? {
            id: entity.topic.id,
            description: entity.topic.description,
          }
        : {
            id: 0,
            description: '',
          },

      year: entity.kpi_year,
      kpiStartDate: entity.kpiStartDate,

      // =========================
      // METRICS
      // =========================
      targetValue: entity.targetValue,
      previousYearValue: entity.previousYearValue,

      // =========================
      // 🔥 NEW: STRATEGIES (ARRAY)
      // =========================
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

      // =========================
      // RELATION
      // =========================
      organization: entity.organization
        ? {
            id: entity.organization.id,
            description: entity.organization.description,
          }
        : undefined,

      unit: entity.unit
        ? {
            id: entity.unit.id,
            description: entity.unit.description,
          }
        : undefined,

      frequency: entity.frequency
        ? {
            id: entity.frequency.id,
            description: entity.frequency.description,
          }
        : undefined,

      conditionOperator: entity.conditionOperator
        ? {
            id: entity.conditionOperator.id,
            description: entity.conditionOperator.description,
          }
        : undefined,

      benchmark: entity.benchmark
        ? {
            id: entity.benchmark.id,
            description: entity.benchmark.description,
          }
        : undefined,

      // =========================
      // MAPPING
      // =========================
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
    };
  }

  static toResponseList(entities: KpiDirectory[]) {
    return entities.map((e) => this.toResponse(e));
  }
}