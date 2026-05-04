// src/modules/kpi/kpi-directory/mappers/kpi-detail.mapper.ts

import { KpiDirectory } from '../entities/kpi_directory.entity';
import { KpiDetailItemDto } from '../dto/kpi-detail-response.dto';

export class KpiDetailMapper {
  static toResponse(entity: KpiDirectory): KpiDetailItemDto {
    return {
      id: entity.id,
      is_active:entity.is_active,
      topic: {
        id: entity.topic.id,
        description: entity.topic.description,
      },

      year: entity.year,
      kpiStartDate: entity.kpiStartDate,
      targetValue: entity.targetValue,
      previousYearValue: entity.previousYearValue,

      numerator: entity.numerator,
      denominator: entity.denominator,
      multiplier: entity.multiplier,

      strategy: entity.strategy
        ? {
          id: entity.strategy.id,
          description: entity.strategy.description,
        }
        : undefined,

      organization: entity.organization
        ? {
          id: entity.organization.id,
          description: entity.organization.description,
        }
        : undefined,

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

      unit: entity.unit
        ? { id: entity.unit.id, description: entity.unit.description }
        : undefined,

      frequency: entity.frequency
        ? { id: entity.frequency.id, description: entity.frequency.description }
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

      userRoles:
        entity.userRoles?.map((ur) => ({
          userRefId: ur.user.id,
          userName: ur.user.description,

          roleRefId: ur.role.id,
          roleName: ur.role.description,
        })) ?? [],
    };
  }
}