import { KpiDirectory } from '../entities/kpi_directory.entity';
import { KpiResponseDto } from '../dto/kpi-response.dto';

export class KpiMapper {

  // =========================
  // LEGACY (DO NOT BREAK)
  // ใช้กับ KPI DETAIL เดิม
  // =========================
  static toResponse(entity: KpiDirectory): KpiResponseDto {
    return {
      id: entity.id,
      year: entity.year,
      kpiStartDate:entity.kpiStartDate,
      strategy: entity.strategy && {
        id: entity.strategy.id,
        description: entity.strategy.description,
      },

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
  // BASE MAPPER (REUSE CORE LOGIC)
  // ใช้สำหรับ LIST + FUTURE APIs
  // =========================
  static base(entity: KpiDirectory) {
    return {
      id: entity.id,
      year: entity.year,

      strategy: entity.strategy
        ? {
          id: entity.strategy.id,
          description: entity.strategy.description,
        }
        : null,

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
  // LIST MAPPER
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