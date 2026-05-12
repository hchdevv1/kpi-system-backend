// src/modules/kpi/kpi-definition/mappers/kpi.mapper.ts

import { KpiDefinition } from '../entities/kpi-definition.entity';
import { CreateKpiDefinitionResponseDto } from '../dto/create-kpi-definition-response.dto';
export class KpiMapper {

  static toResponse(entity: KpiDefinition) {
    return {
      id: entity.id,
      kpiYear: entity.kpi_year,
      kpiStartDate: entity.kpiStartDate,

      // =========================
      // STRATEGY (flat + group)
      // =========================
      strategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.strategy.id,
          code: m.strategy.code,
          description: m.strategy.description,
          group: m.strategy.strategyGroup && {
            id: m.strategy.strategyGroup.id,
            code: m.strategy.strategyGroup.code,
            description: m.strategy.strategyGroup.description,
          },
        })) ?? [],

      // =========================
      // ORGANIZATION
      // =========================
      organizations:
        entity.kpiOrganizations?.map((m) => ({
          id: m.organization.id,
          code: m.organization.code,
          description: m.organization.description,
          group: m.organization.organizationGroup && {
            id: m.organization.organizationGroup.id,
            code: m.organization.organizationGroup.code,
            description: m.organization.organizationGroup.description,
          },
        })) ?? [],

      // =========================
      // SERVICE UNIT
      // =========================
      serviceUnits:
        entity.kpiServiceUnits?.map((m) => ({
          id: m.serviceUnit.id,
          code: m.serviceUnit.code,
          description: m.serviceUnit.description,
          group: m.serviceUnit.serviceUnitGroup && {
            id: m.serviceUnit.serviceUnitGroup.id,
            code: m.serviceUnit.serviceUnitGroup.code,
            description: m.serviceUnit.serviceUnitGroup.description,
          },
        })) ?? [],

      // =========================
      // SIMPLE
      // =========================
      simples:
        entity.kpiSimples?.map((m) => ({
          id: m.simple.id,
          code: m.simple.code,
          description: m.simple.description,
          group: m.simple.kpisimplegroup && {
            id: m.simple.kpisimplegroup.id,
            code: m.simple.kpisimplegroup.code,
            description: m.simple.kpisimplegroup.description,
          },
        })) ?? [],

      // =========================
      // USER ROLES
      // =========================
      userRoles:
        entity.userRoles?.map((ur) => ({
          userId: ur.user?.id,
          description: ur.user?.description,
          roleId: ur.role?.id,
        })) ?? [],

      // =========================
      // MASTER DATA
      // =========================
      topic: entity.topic && {
        id: entity.topic.id,
        description: entity.topic.description,
      },

      measure: entity.measureCategory && {
        id: entity.measureCategory.id,
        description: entity.measureCategory.description,
      },

      frequency: entity.frequency && {
        id: entity.frequency.id,
        description: entity.frequency.description,
      },

      unit: entity.unit && {
        id: entity.unit.id,
        description: entity.unit.description,
      },

      conditionOperator: entity.conditionOperator && {
        id: entity.conditionOperator.id,
        description: entity.conditionOperator.description,
      },

      benchmark: entity.benchmark && {
        id: entity.benchmark.id,
        description: entity.benchmark.description,
      },

      // =========================
      // KPI VALUE
      // =========================
      numerator: entity.numerator,
      denominator: entity.denominator,
      multiplier: entity.multiplier,
      targetValue: entity.targetValue,
      previousYearValue: entity.previousYearValue,
      benchmarkTargetValue: entity.benchmark_target_value,

      isActive: entity.is_active,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }
  static toCreateResponse(entity: KpiDefinition): CreateKpiDefinitionResponseDto {
    return {
      id: entity.id,

      topic: {
        id: entity.topic.id,
        description: entity.topic.description,
      },

      kpiYear: entity.kpi_year,
      kpiStartDate: entity.kpiStartDate,

      measure: entity.measureCategory && {
        id: entity.measureCategory.id,
        description: entity.measureCategory.description,
      },

      frequency: {
        id: entity.frequency.id,
        description: entity.frequency.description,
        interval_value: entity.frequency.interval_value,
      },

      unit: {
        id: entity.unit.id,
        description: entity.unit.description,
        symbol: entity.unit.symbol ?? undefined,
        scale_factor: entity.unit.scale_factor ?? undefined,
        is_percent: entity.unit.is_percent,
      },

      conditionOperator: entity.conditionOperator && {
        id: entity.conditionOperator.id,
        description: entity.conditionOperator.description,
        symbol: entity.conditionOperator.symbol ?? undefined,
      },

      // ✅ FIX: formula object
      formula: {
        numerator: entity.numerator,
        denominator: entity.denominator,
        multiplier: entity.multiplier,
      },

      targetValue: entity.targetValue,
      previousYearValue: entity.previousYearValue,

      // ✅ FIX: benchmark รวม targetValue
      benchmark: entity.benchmark && {
        id: entity.benchmark.id,
        description: entity.benchmark.description,
        targetValue: entity.benchmark_target_value,
      },

      // (optional ถ้ายังอยากแยกก็ได้ แต่ตอนนี้ DTO มีแล้ว)
      benchmarkTargetValue: entity.benchmark_target_value,

      strategies:
        entity.kpiStrategies?.map((m) => ({
          id: m.strategy.id,
          code: m.strategy.code,
          description: m.strategy.description,
          strategyGroup: {
            id: m.strategy.strategyGroup.id,
            code: m.strategy.strategyGroup.code,
            description: m.strategy.strategyGroup.description,
          },
        })) ?? [],

      organizations:
        entity.kpiOrganizations?.map((m) => ({
          id: m.organization.id,
          code: m.organization.code,
          description: m.organization.description,
          organizationGroup: {
            id: m.organization.organizationGroup.id,
            code: m.organization.organizationGroup.code,
            description: m.organization.organizationGroup.description,
          },
        })) ?? [],

      serviceUnits:
        entity.kpiServiceUnits?.map((m) => ({
          id: m.serviceUnit.id,
          code: m.serviceUnit.code,
          description: m.serviceUnit.description,
          serviceunitGroup: {
            id: m.serviceUnit.serviceUnitGroup.id,
            code: m.serviceUnit.serviceUnitGroup.code,
            description: m.serviceUnit.serviceUnitGroup.description,
          },
        })) ?? [],

      simples:
        entity.kpiSimples?.map((m) => ({
          id: m.simple.id,
          code: m.simple.code,
          description: m.simple.description,
          simpleGroup: {
            id: m.simple.kpisimplegroup.id,
            code: m.simple.kpisimplegroup.code,
            description: m.simple.kpisimplegroup.description,
          },
        })) ?? [],

      userRoles:
        entity.userRoles?.map((m) => ({
          userId: m.user.id,
          description: m.user.description ?? '',
          roleId: m.role.id,
        })) ?? [],

      // ✅ FIX: required fields
      isActive: entity.is_active,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }
  static toCreateResponseArray(
    entities: KpiDefinition[],
  ): CreateKpiDefinitionResponseDto[] {
    return entities.map((e) => this.toCreateResponse(e));
  }
  static toResponseList(entities: KpiDefinition[]) {
    return entities.map((e) => this.toResponse(e));
  }
}