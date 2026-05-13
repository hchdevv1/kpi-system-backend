import { Injectable, BadRequestException ,NotFoundException} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { KpiDefinition } from './entities/kpi-definition.entity';
import { KpiStrategyMappings } from '../kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import { KpiOrganizationMappings } from '../kpi-organization-mappings/entities/kpi_organization_mappings.entity';
import { KpiServiceUnitsMappings } from '../kpi-service-unit-mappings/entities/kpi_service_units_mappings.entity';
import { KpiSimpleMappings } from '../kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import { KpiUserRolesMappings } from '../kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';

import { CreateKpiDefinitionDto } from './dto/create-kpi-definition.dto';
import { CreateKpiDefinitionResponseDto } from './dto/create-kpi-definition-response.dto';
import { QueryKpiDefinitionDto } from './dto/query-kpi-definition.dto';
import { KpiMapper } from './mappers/kpi.mapper';
import {
  validateRefExists,
  validateRefsExist,
  validateNestedRefs,
} from '../../../common/helpers/validate-ref.helper';
import { MstTopic } from '../../topic/entities/mst_topic.entity';
import { MstMeasure } from '../../measure-category/entities/mst_measure.entity';
import { MstFrequency } from '../../frequency/entities/mst_frequency.entity';
import { MstUnit } from '../../unit/entities/mst_kpi_unit.entity';
import { MstConditionOperator } from '../../condition-operator/entities/mst_condition_operator.entity';
import { MstBenchmark } from '../../benchmark/entities/mst_benchmark.entity';
import { MstStrategy } from '../../strategy/entities/mst_strategy.entity';
import { MstOrganization } from '../../organization/entities/mst_organization.entity';
import { MstServiceUnit } from '../../service-unit/entities/mst_serviceunit.entity';
import { MstSimple } from '../../simple/entities/mst_simple.entity';
import { UserSystem } from '../../users/entities/users.entity';
import { MstKpiRoles } from '../../roles/entities/utils_kpi_roles.entity';

@Injectable()
export class KpiDefinitionService {
  constructor(private readonly dataSource: DataSource) { }

  async create(dto: CreateKpiDefinitionDto) {
    return this.dataSource.transaction(async (manager) => {

      // =========================
      // VALIDATE
      // =========================
      await validateRefExists(
        manager,
        MstTopic,
        dto.topicRefId,
        'Topic',
      );

      await validateRefExists(
        manager,
        MstMeasure,
        dto.measureRefId,
        'Measure',
      );

      await validateRefExists(
        manager,
        MstFrequency,
        dto.frequencyRefId,
        'Frequency',
      );

      await validateRefExists(
        manager,
        MstUnit,
        dto.unitRefId,
        'Unit',
      );

      await validateRefExists(
        manager,
        MstConditionOperator,
        dto.conditionOperatorRefId,
        'Condition operator',
      );

      await validateRefExists(
        manager,
        MstBenchmark,
        dto.benchmarkRefId,
        'Benchmark',
      );

      await validateRefsExist(
        manager,
        MstStrategy,
        dto.strategyIds,
        'Strategy',
      );

      await validateRefsExist(
        manager,
        MstOrganization,
        dto.organizationIds,
        'Organization',
      );

      await validateRefsExist(
        manager,
        MstServiceUnit,
        dto.serviceUnitIds,
        'Service unit',
      );

      await validateRefsExist(
        manager,
        MstSimple,
        dto.simpleIds,
        'Simple',
      );


      await validateNestedRefs(
        manager,
        UserSystem,
        dto.userRoles,
        'userId',
        'User',
      );

      await validateNestedRefs(
        manager,
        MstKpiRoles,
        dto.userRoles,
        'roleId',
        'Role',
      );
      // =========================
      // 1. CREATE KPI
      // =========================
      const kpi = manager.create(KpiDefinition, {
        topic_ref_id: dto.topicRefId,
        kpi_year: dto.kpiYear,
        kpiStartDate: dto.kpiStartDate,

        measureRefId: dto.measureRefId,
        frequencyRefId: dto.frequencyRefId,
        unitRefId: dto.unitRefId,
        conditionOperatorRefId: dto.conditionOperatorRefId,
        benchmarkRefId: dto.benchmarkRefId,

        numerator: dto.numerator,
        denominator: dto.denominator,
        multiplier: dto.multiplier,

        targetValue: dto.targetValue,
        previousYearValue: dto.previousYearValue,
        benchmark_target_value: dto.benchmarkTargetValue,

        is_active: true,
      });

      const saved = await manager.save(KpiDefinition, kpi);

      // =========================
      // 2. STRATEGY
      // =========================
      if (dto.strategyIds?.length) {
        const rows = dto.strategyIds.map((id) =>
          manager.create(KpiStrategyMappings, {
            kpiId: saved.id,
            strategyId: id,
          }),
        );
        await manager.save(rows);
      }

      // =========================
      // 3. ORGANIZATION
      // =========================
      if (dto.organizationIds?.length) {
        const rows = dto.organizationIds.map((id) =>
          manager.create(KpiOrganizationMappings, {
            kpiId: saved.id,
            organizationId: id,
          }),
        );
        await manager.save(rows);
      }

      // =========================
      // 4. SERVICE UNIT
      // =========================
      if (dto.serviceUnitIds?.length) {
        const rows = dto.serviceUnitIds.map((id) =>
          manager.create(KpiServiceUnitsMappings, {
            kpiId: saved.id,
            serviceUnitId: id,
          }),
        );
        await manager.save(rows);
      }

      // =========================
      // 5. SIMPLE
      // =========================
      if (dto.simpleIds?.length) {
        const rows = dto.simpleIds.map((id) =>
          manager.create(KpiSimpleMappings, {
            kpiId: saved.id,
            simpleId: id,
          }),
        );
        await manager.save(rows);
      }

      // =========================
      // 6. USER ROLES
      // =========================
      if (dto.userRoles?.length) {
        const rows = dto.userRoles.map((r) =>
          manager.create(KpiUserRolesMappings, {
            kpiId: saved.id,
            userId: r.userId,
            roleId: r.roleId,
          }),
        );
        await manager.save(rows);
      }

      // =========================
      // 7. RELOAD
      // =========================
      const full = await manager.findOne(KpiDefinition, {
        where: { id: saved.id },
        relations: {
          topic: true,
          measureCategory: true,
          frequency: true,
          unit: true,
          conditionOperator: true,
          benchmark: true,
          kpiStrategies: { strategy: { strategyGroup: true } },
          kpiOrganizations: { organization: { organizationGroup: true } },
          kpiServiceUnits: { serviceUnit: { serviceUnitGroup: true } },
          kpiSimples: { simple: { kpisimplegroup: true } },
          userRoles: { user: true, role: true },
        },
      });

      if (!full) {
        throw new BadRequestException('Create KPI failed');
      }

      return KpiMapper.toCreateResponse(full);
    });
  }
  async findAll(
    query: QueryKpiDefinitionDto,
  ): Promise<{
    items: CreateKpiDefinitionResponseDto[];
    meta: { page: number; limit: number; total: number };
  }> {
    const {
      year,
      measureRefId,
      kpiGroup,
      page = 1,
      limit = 10,
    } = query;

    const currentYear = new Date().getFullYear();

    const qb = this.dataSource
      .getRepository(KpiDefinition)
      .createQueryBuilder('kpi');

    // =========================
    // RELATIONS
    // =========================
    qb.leftJoinAndSelect('kpi.topic', 'topic');
    qb.leftJoinAndSelect('kpi.measureCategory', 'measureCategory');
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
    // FILTER: YEAR (DEFAULT)
    // =========================
    qb.andWhere('kpi.kpi_year = :year', {
      year: year ?? currentYear,
    });

    // =========================
    // FILTER: MEASURE
    // =========================
    if (measureRefId) {
      qb.andWhere('kpi.measure_ref_id = :measureRefId', {
        measureRefId,
      });
    }

    // =========================
    // KPI GROUP FILTER (HARDCORE)
    // =========================
    if (kpiGroup) {
      switch (kpiGroup) {
        // =====================
        // STRATEGY
        // =====================
        case 'strategy':
          qb.innerJoin('kpi.kpiStrategies', 'ks');
          break;

        // =====================
        // ORGANIZATION
        // =====================
        case 'organization':
          qb.innerJoin('kpi.kpiOrganizations', 'ko');
          break;

        // =====================
        // SIMPLE
        // =====================
        case 'simple':
          qb.innerJoin('kpi.kpiSimples', 'ksm');
          break;

        // =====================
        // SERVICE UNIT GROUP FILTER
        // =====================
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

    // =========================
    // ACTIVE ONLY
    // =========================
    qb.andWhere('kpi.is_active = true');

    // =========================
    // DISTINCT (avoid duplicate rows)
    // =========================
    qb.distinct(true);

    // =========================
    // PAGINATION
    // =========================
    qb.skip((page - 1) * limit).take(limit);

    // =========================
    // ORDER
    // =========================
    qb.orderBy('kpi.id', 'DESC');

    // =========================
    // EXECUTE
    // =========================
    const [data, total] = await qb.getManyAndCount();

    // =========================
    // MAP
    // =========================
    const items = KpiMapper.toCreateResponseArray(data);

    return {
      items,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
  async findAll2(): Promise<CreateKpiDefinitionResponseDto[]> {
    const entities = await this.dataSource.getRepository(KpiDefinition).find({
      relations: {
        topic: true,
        measureCategory: true,
        frequency: true,
        unit: true,
        conditionOperator: true,
        benchmark: true,

        kpiStrategies: { strategy: { strategyGroup: true } },
        kpiOrganizations: { organization: { organizationGroup: true } },
        kpiServiceUnits: { serviceUnit: { serviceUnitGroup: true } },
        kpiSimples: { simple: { kpisimplegroup: true } },

        userRoles: { user: true, role: true },
      },
      order: {
        id: 'DESC',
      },
    });

    return KpiMapper.toCreateResponseArray(entities);
  }
  async findById(id: number): Promise<CreateKpiDefinitionResponseDto> {
    const entity = await this.dataSource.getRepository(KpiDefinition).findOne({
      where: { id },
      relations: {
        topic: true,
        measureCategory: true,
        frequency: true,
        unit: true,
        conditionOperator: true,
        benchmark: true,

        kpiStrategies: { strategy: { strategyGroup: true } },
        kpiOrganizations: { organization: { organizationGroup: true } },
        kpiServiceUnits: { serviceUnit: { serviceUnitGroup: true } },
        kpiSimples: { simple: { kpisimplegroup: true } },

        userRoles: { user: true, role: true },
      },
    });

    if (!entity) {
      throw new BadRequestException(`KPI ID ${id} not found`);
    }

    return KpiMapper.toCreateResponse(entity);
  }
  async patch2(
    id: number,
    dto: CreateKpiDefinitionDto,
  ): Promise<CreateKpiDefinitionResponseDto> {
    return this.dataSource.transaction(async (manager) => {

      // =========================
      // 1. FIND EXISTING KPI
      // =========================
      const kpi = await manager.findOne(KpiDefinition, {
        where: { id },
        relations: {
          kpiStrategies: true,
          kpiOrganizations: true,
          kpiServiceUnits: true,
          kpiSimples: true,
          userRoles: true,
        },
      });

      if (!kpi) {
        throw new BadRequestException(`KPI ID ${id} not found`);
      }

      // =========================
      // 2. UPDATE MAIN FIELDS
      // =========================
      Object.assign(kpi, {
        topic_ref_id: dto.topicRefId,
        kpi_year: dto.kpiYear,
        kpiStartDate: dto.kpiStartDate,

        measureRefId: dto.measureRefId,
        frequencyRefId: dto.frequencyRefId,
        unitRefId: dto.unitRefId,
        conditionOperatorRefId: dto.conditionOperatorRefId,

        numerator: dto.numerator,
        denominator: dto.denominator,
        multiplier: dto.multiplier,

        targetValue: dto.targetValue,
        previousYearValue: dto.previousYearValue,
        benchmarkRefId: dto.benchmarkRefId,
        benchmark_target_value: dto.benchmarkTargetValue,

        is_active: true,
      });

      await manager.save(KpiDefinition, kpi);

      // =========================
      // 3. CLEAR OLD MAPPINGS
      // =========================
      await manager.delete(KpiStrategyMappings, { kpiId: id });
      await manager.delete(KpiOrganizationMappings, { kpiId: id });
      await manager.delete(KpiServiceUnitsMappings, { kpiId: id });
      await manager.delete(KpiSimpleMappings, { kpiId: id });
      await manager.delete(KpiUserRolesMappings, { kpiId: id });

      // =========================
      // 4. RE-INSERT STRATEGY
      // =========================
      if (dto.strategyIds?.length) {
        const rows = dto.strategyIds.map((strategyId) =>
          manager.create(KpiStrategyMappings, {
            kpiId: id,
            strategyId,
          }),
        );
        await manager.save(KpiStrategyMappings, rows);
      }

      // =========================
      // 5. ORGANIZATION
      // =========================
      if (dto.organizationIds?.length) {
        const rows = dto.organizationIds.map((organizationId) =>
          manager.create(KpiOrganizationMappings, {
            kpiId: id,
            organizationId,
          }),
        );
        await manager.save(KpiOrganizationMappings, rows);
      }

      // =========================
      // 6. SERVICE UNIT
      // =========================
      if (dto.serviceUnitIds?.length) {
        const rows = dto.serviceUnitIds.map((serviceUnitId) =>
          manager.create(KpiServiceUnitsMappings, {
            kpiId: id,
            serviceUnitId,
          }),
        );
        await manager.save(KpiServiceUnitsMappings, rows);
      }

      // =========================
      // 7. SIMPLE
      // =========================
      if (dto.simpleIds?.length) {
        const rows = dto.simpleIds.map((simpleId) =>
          manager.create(KpiSimpleMappings, {
            kpiId: id,
            simpleId,
          }),
        );
        await manager.save(KpiSimpleMappings, rows);
      }

      // =========================
      // 8. USER ROLES
      // =========================
      if (dto.userRoles?.length) {
        const rows = dto.userRoles.map((r) =>
          manager.create(KpiUserRolesMappings, {
            kpiId: id,
            userId: r.userId,
            description: 'r.userId',
            roleId: r.roleId,
          }),
        );
        await manager.save(KpiUserRolesMappings, rows);
      }

      // =========================
      // 9. RELOAD FULL DATA
      // =========================
      const full = await manager.findOne(KpiDefinition, {
        where: { id },
        relations: {
          topic: true,
          measureCategory: true,
          frequency: true,
          unit: true,
          conditionOperator: true,
          benchmark: true,

          kpiStrategies: { strategy: { strategyGroup: true } },
          kpiOrganizations: { organization: { organizationGroup: true } },
          kpiServiceUnits: { serviceUnit: { serviceUnitGroup: true } },
          kpiSimples: { simple: { kpisimplegroup: true } },

          userRoles: { user: true, role: true },
        },
      });

      if (!full) {
        throw new BadRequestException('KPI not found after patch');
      }

      return KpiMapper.toCreateResponse(full);
    });
  }
  async patch(
  id: number,
  dto: CreateKpiDefinitionDto,
): Promise<CreateKpiDefinitionResponseDto> {
  return this.dataSource.transaction(async (manager) => {

    // =========================
    // 1. FIND EXISTING KPI
    // =========================
    const kpi = await manager.findOne(KpiDefinition, {
      where: { id },
      relations: {
        kpiStrategies: true,
        kpiOrganizations: true,
        kpiServiceUnits: true,
        kpiSimples: true,
        userRoles: true,
      },
    });

    if (!kpi) {
      throw new NotFoundException(`KPI ID ${id} not found`);
    }

    // =========================
    // 2. UPDATE MAIN FIELDS (PATCH STYLE)
    // =========================
    if (dto.topicRefId !== undefined) {
      kpi.topic_ref_id = dto.topicRefId;
    }

    if (dto.kpiYear !== undefined) {
      kpi.kpi_year = dto.kpiYear;
    }

    if (dto.kpiStartDate !== undefined) {
      kpi.kpiStartDate = dto.kpiStartDate;
    }

    if (dto.measureRefId !== undefined) {
      kpi.measureRefId = dto.measureRefId;
    }

    if (dto.frequencyRefId !== undefined) {
      kpi.frequencyRefId = dto.frequencyRefId;
    }

    if (dto.unitRefId !== undefined) {
      kpi.unitRefId = dto.unitRefId;
    }

    if (dto.conditionOperatorRefId !== undefined) {
      kpi.conditionOperatorRefId = dto.conditionOperatorRefId;
    }

    if (dto.numerator !== undefined) {
      kpi.numerator = dto.numerator;
    }

    if (dto.denominator !== undefined) {
      kpi.denominator = dto.denominator;
    }

    if (dto.multiplier !== undefined) {
      kpi.multiplier = dto.multiplier;
    }

    if (dto.targetValue !== undefined) {
      kpi.targetValue = dto.targetValue;
    }

    if (dto.previousYearValue !== undefined) {
      kpi.previousYearValue = dto.previousYearValue;
    }

    if (dto.benchmarkRefId !== undefined) {
      kpi.benchmarkRefId = dto.benchmarkRefId;
    }

    if (dto.benchmarkTargetValue !== undefined) {
      kpi.benchmark_target_value = dto.benchmarkTargetValue;
    }

    if (dto.isActive !== undefined) {
      kpi.is_active = dto.isActive;
    }

    await manager.save(KpiDefinition, kpi);

    // =========================
    // 3. CLEAR OLD MAPPINGS
    // =========================
    await manager.delete(KpiStrategyMappings, { kpiId: id });
    await manager.delete(KpiOrganizationMappings, { kpiId: id });
    await manager.delete(KpiServiceUnitsMappings, { kpiId: id });
    await manager.delete(KpiSimpleMappings, { kpiId: id });
    await manager.delete(KpiUserRolesMappings, { kpiId: id });

    // =========================
    // 4. RE-INSERT STRATEGY
    // =========================
    if (dto.strategyIds?.length) {
      const rows = dto.strategyIds.map((strategyId) =>
        manager.create(KpiStrategyMappings, {
          kpiId: id,
          strategyId,
        }),
      );
      await manager.save(rows);
    }

    // =========================
    // 5. ORGANIZATION
    // =========================
    if (dto.organizationIds?.length) {
      const rows = dto.organizationIds.map((organizationId) =>
        manager.create(KpiOrganizationMappings, {
          kpiId: id,
          organizationId,
        }),
      );
      await manager.save(rows);
    }

    // =========================
    // 6. SERVICE UNIT
    // =========================
    if (dto.serviceUnitIds?.length) {
      const rows = dto.serviceUnitIds.map((serviceUnitId) =>
        manager.create(KpiServiceUnitsMappings, {
          kpiId: id,
          serviceUnitId,
        }),
      );
      await manager.save(rows);
    }

    // =========================
    // 7. SIMPLE
    // =========================
    if (dto.simpleIds?.length) {
      const rows = dto.simpleIds.map((simpleId) =>
        manager.create(KpiSimpleMappings, {
          kpiId: id,
          simpleId,
        }),
      );
      await manager.save(rows);
    }

    // =========================
    // 8. USER ROLES
    // =========================
    if (dto.userRoles?.length) {
      const rows = dto.userRoles.map((r) =>
        manager.create(KpiUserRolesMappings, {
          kpiId: id,
          userId: r.userId,
          roleId: r.roleId,
        }),
      );
      await manager.save(rows);
    }

    // =========================
    // 9. RELOAD FULL DATA
    // =========================
    const full = await manager.findOne(KpiDefinition, {
      where: { id },
      relations: {
        topic: true,
        measureCategory: true,
        frequency: true,
        unit: true,
        conditionOperator: true,
        benchmark: true,

        kpiStrategies: { strategy: { strategyGroup: true } },
        kpiOrganizations: { organization: { organizationGroup: true } },
        kpiServiceUnits: { serviceUnit: { serviceUnitGroup: true } },
        kpiSimples: { simple: { kpisimplegroup: true } },

        userRoles: { user: true, role: true },
      },
    });

    if (!full) {
      throw new NotFoundException('KPI not found after patch');
    }

    return KpiMapper.toCreateResponse(full);
  });
}
}
