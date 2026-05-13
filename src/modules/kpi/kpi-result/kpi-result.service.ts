/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';
import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';
import { KpiResultMapper } from './mappers/kpi-result.mapper';
import { KpiUserRolesMappings } from '../kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';

@Injectable()
export class KpiResultService {
  constructor(private readonly dataSource: DataSource) { }

  async findAll(query: QueryKpiResultDto) {
    const {
      year,
      userId,
      kpiGroup,
      measureRefId,
      isAdmin,
      usersystem_role_id,
      page = 1,
      limit = 10,
    } = query;
    console.log(query)
    const targetYear = year ?? new Date().getFullYear();

    // =========================
    // 1. KPI QUERY
    // =========================
    const qb = this.dataSource
      .getRepository(KpiDefinition)
      .createQueryBuilder('kpi');

    // =========================
    // RELATIONS
    // =========================
    qb.leftJoinAndSelect('kpi.topic', 'topic');
    qb.leftJoinAndSelect('kpi.frequency', 'frequency');
    qb.leftJoinAndSelect('kpi.unit', 'unit');
    qb.leftJoinAndSelect('kpi.conditionOperator', 'conditionOperator');
    qb.leftJoinAndSelect('kpi.benchmark', 'benchmark');

    qb.leftJoinAndSelect('kpi.kpiStrategies', 'kpiStrategies');
    qb.leftJoinAndSelect('kpiStrategies.strategy', 'strategy');
    qb.leftJoinAndSelect('strategy.strategyGroup', 'strategyGroup');

    qb.leftJoinAndSelect('kpi.kpiOrganizations', 'kpiOrganizations');
    qb.leftJoinAndSelect('kpiOrganizations.organization', 'organization');
    qb.leftJoinAndSelect('organization.organizationGroup', 'organizationGroup');

    qb.leftJoinAndSelect('kpi.kpiServiceUnits', 'kpiServiceUnits');
    qb.leftJoinAndSelect('kpiServiceUnits.serviceUnit', 'serviceUnit');
    qb.leftJoinAndSelect('serviceUnit.serviceUnitGroup', 'serviceUnitGroup');

    qb.leftJoinAndSelect('kpi.kpiSimples', 'kpiSimples');
    qb.leftJoinAndSelect('kpiSimples.simple', 'simple');
    qb.leftJoinAndSelect('simple.kpisimplegroup', 'simpleGroup');

    qb.leftJoinAndSelect('kpi.userRoles', 'userRoles');
    qb.leftJoinAndSelect('userRoles.user', 'user');
    qb.leftJoinAndSelect('userRoles.role', 'role');

    // =========================
    // FILTERS
    // =========================
    qb.andWhere('kpi.kpi_year = :year', {
      year: targetYear,
    });

    if (measureRefId) {
      qb.andWhere('kpi.measure_ref_id = :measureRefId', {
        measureRefId,
      });
    }

    // user filter (optional)
    if (userId) {
      qb.innerJoin('kpi.userRoles', 'ur')
        .andWhere('ur.user_id = :userId', { userId });
    }

    // =========================
    // GROUP FILTER
    // =========================
    if (kpiGroup) {
      switch (kpiGroup) {
        case 'strategy':
          qb.innerJoin('kpi.kpiStrategies', 'ks');
          break;

        case 'organization':
          qb.innerJoin('kpi.kpiOrganizations', 'ko');
          break;

        case 'simple':
          qb.innerJoin('kpi.kpiSimples', 'ksm');
          break;

        case 'PCT':
        case 'CoE':
        case 'Location':
          qb.innerJoin('kpi.kpiServiceUnits', 'ksu')
            .innerJoin('ksu.serviceUnit', 'su')
            .innerJoin('su.serviceUnitGroup', 'sug')
            .andWhere('sug.description = :group', {
              group: kpiGroup,
            });
          break;
      }
    }

    qb.andWhere('kpi.is_active = true');

    qb.distinct(true);

    qb.skip((page - 1) * limit).take(limit);

    qb.orderBy('kpi.id', 'DESC');

    // =========================
    // FETCH KPI
    // =========================
    const [kpis, total] = await qb.getManyAndCount();

    const kpiIds = kpis.map((k) => k.id);

    // =========================
    // FETCH LATEST DATA ENTRY (IMPORTANT FIX)
    // =========================
    const latestMap = new Map<number, KpiDataEntry>();
    const userRoleMap = new Map<
      string,
      {
        roleId: number;
        roleDescription: string;
      }
    >();
    const userMap = new Map<number, any>();

    if (kpiIds.length > 0) {
      const entries = await this.dataSource
        .getRepository(KpiDataEntry)
        .createQueryBuilder('entry')
        .leftJoinAndSelect('entry.updatedByUser', 'updatedByUser')
        .where('entry.kpi_definition_id IN (:...ids)', {
          ids: kpiIds,
        })
        .andWhere('entry.kpi_def_year = :year', {
          year: targetYear,
        })
        .orderBy('entry.updated_at', 'DESC') // ✅ FIX: ใช้ updated ล่าสุดจริง
        .addOrderBy('entry.kpi_def_month', 'DESC')
        .getMany();

      for (const entry of entries) {
        const kpiId = entry.kpiDefinitionId;

        if (!latestMap.has(kpiId)) {
          latestMap.set(kpiId, entry);

          // =========================
          // USER UPDATE MAP (FIX HERE)
          // =========================
          if (entry.updatedByUser) {
            userMap.set(kpiId, {
              userId: entry.updatedByUser.id,
              usercode: entry.updatedByUser.usercode,
              description: entry.updatedByUser.description,
              roleId: null, // ถ้ายังไม่มี relation role ใน user entity
            });
          }
          // =========================
// FETCH USER ROLE MAPPING
// =========================

const updatedUserIds = entries
  .map((e) => e.updatedBy)
  .filter(Boolean);

if (updatedUserIds.length > 0) {
  const roleMappings = await this.dataSource
    .getRepository(KpiUserRolesMappings)
    .createQueryBuilder('kur')

    .leftJoinAndSelect('kur.role', 'role')

    .where('kur.kpi_id IN (:...kpiIds)', {
      kpiIds,
    })

    .andWhere('kur.user_id IN (:...userIds)', {
      userIds: updatedUserIds,
    })

    .getMany();

  for (const mapping of roleMappings) {
    const key = `${mapping.kpiId}-${mapping.userId}`;

    userRoleMap.set(key, {
      roleId: mapping.roleId,
      roleDescription: mapping.role.description,
    });
  }
}
        }
      }
    }

    // =========================
    // MAP RESPONSE
    // =========================
    const items = KpiResultMapper.toResponseList(
      kpis,
      latestMap,
      userRoleMap,
    );

    return {
      items,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
}