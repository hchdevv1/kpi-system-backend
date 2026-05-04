import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



import { KpiDirectory } from './entities/kpi_directory.entity';
import { KpiServiceUnits } from '../kpi_service_units/entities/kpi_service_units.entity';
import { KpiSimpleMappings } from '../kpi_simple_mappings/entities/kpi_simple_mappings.entity';
import { KpiUserRoles } from '../kpi-user-roles/entities/kpi_user_roles.entity';

import { MstFrequency } from '../../frequency/entities/mst_frequency.entity';
import { MstUnit } from '../../kpi-unit/entities/mst_kpi_unit.entity';
import { MstConditionOperator } from '../../condition-operator/entities/mst_condition_operator.entity';
import { MstBenchmark } from '../../kpi-benchmark/entities/mst_benchmark.entity';
import { MstMeasure } from '../../measure-category/entities/mst_measure.entity';
import { MstStrategy } from '../../strategy/entities/mst_strategy.entity';
import { MstOrganization } from '../../organization/entities/mst_organization.entity';
import { MstServiceUnit } from '../../service-unit/entities/mst_serviceunit.entity';
import { MstSimple } from '../../kpi-simple/entities/mst_simple.entity';

import { UserSystem } from '../../users/entities/users.entity';
import { MstKpiRoles } from '../../roles/entities/utils_kpi_roles.entity';
import { QueryKpiDto } from './dto/query-kpi.dto';
import {
  validateRefExists,
  validateRefsExist,
  validateNestedRefs,
} from 'src/common/helpers/validate-ref.helper';

import { CreateKpiDto } from './dto/create-kpi.dto';
import { KpiResponseDto } from './dto/kpi-response.dto';
import { KpiMapper } from './mappers/kpi.mapper';
import { KpiListMapper } from './mappers/kpi-list.mapper';
import { KpiDetailMapper } from './mappers/kpi-detail.mapper';
import { UpdateKpiDto } from './dto/update-kpi.dto';
@Injectable()
export class KpiDirectoryService {
  constructor(private readonly dataSource: DataSource,
    @InjectRepository(KpiDirectory)
    private readonly kpiRepo: Repository<KpiDirectory>,
    @InjectRepository(KpiServiceUnits)
    private readonly kpiServiceUnitRepo: Repository<KpiServiceUnits>,
    @InjectRepository(KpiUserRoles)
    private readonly kpiUserRoleRepo: Repository<KpiUserRoles>,
    @InjectRepository(KpiSimpleMappings)
    private readonly kpiSimpleRepo: Repository<KpiSimpleMappings>,




  ) { }
  async create(dto: CreateKpiDto): Promise<KpiResponseDto> {
    return this.dataSource.transaction(async (manager) => {
      // =========================
      // 🔥 1. VALIDATE FK
      // =========================

      await validateRefExists(manager, MstFrequency, dto.frequencyRefId, 'frequencyRefId');
      await validateRefExists(manager, MstUnit, dto.unitRefId, 'unitRefId');

      await validateRefExists(
        manager,
        MstConditionOperator,
        dto.conditionOperatorRefId,
        'conditionOperatorRefId',
      );

      await validateRefExists(manager, MstBenchmark, dto.benchmarkRefId, 'benchmarkRefId');
      await validateRefExists(manager, MstMeasure, dto.measureRefId, 'measureRefId');
      await validateRefExists(manager, MstStrategy, dto.strategyRefId, 'strategyRefId');
      await validateRefExists(manager, MstOrganization, dto.organizationRefId, 'organizationRefId');

      await validateRefsExist(
        manager,
        MstServiceUnit,
        dto.serviceUnitRefIds,
        'serviceUnitRefIds',
      );

      await validateRefsExist(
        manager,
        MstSimple,
        dto.simpleRefIds,
        'simpleRefIds',
      );

      await validateNestedRefs(
        manager,
        UserSystem,
        dto.userRoles,
        'userRefId',
        'userRefId',
      );

      await validateNestedRefs(
        manager,
        MstKpiRoles,
        dto.userRoles,
        'roleRefId',
        'roleRefId',
      );

      // =========================
      // 🧩 2. CREATE KPI
      // =========================

      const kpi = manager.create(KpiDirectory, {
        topicRefId: dto.topicRefId,
        year: dto.year,
        kpiStartDate: dto.kpiStartDate,
        strategyRefId: dto.strategyRefId,
        organizationRefId: dto.organizationRefId,
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
      });

      const savedKpi = await manager.save(KpiDirectory, kpi);

      // =========================
      // 🔗 3. SERVICE UNITS
      // =========================

      if (dto.serviceUnitRefIds?.length) {
        const serviceUnits = dto.serviceUnitRefIds.map((id) =>
          manager.create(KpiServiceUnits, {
            kpiRefId: savedKpi.id,
            serviceUnitRefId: id,
          }),
        );

        await manager.save(KpiServiceUnits, serviceUnits);
      }

      // =========================
      // 🔗 4. KPI SIMPLE
      // =========================

      if (dto.simpleRefIds?.length) {
        const simples = dto.simpleRefIds.map((id) =>
          manager.create(KpiSimpleMappings, {
            kpiRefId: savedKpi.id,
            simpleRefId: id,
          }),
        );

        await manager.save(KpiSimpleMappings, simples);
      }

      // =========================
      // 🔗 5. USER ROLES
      // =========================

      if (dto.userRoles?.length) {
        const roles = dto.userRoles.map((r) =>
          manager.create(KpiUserRoles, {
            kpiRefId: savedKpi.id,
            userRefId: r.userRefId,
            roleRefId: r.roleRefId,
          }),
        );

        await manager.save(KpiUserRoles, roles);
      }

      // =========================
      // 🔥 6. RELOAD (IMPORTANT)
      // =========================

      const full = await manager.findOne(KpiDirectory, {
        where: { id: savedKpi.id },
        relations: {
          strategy: true,
          organization: true,
          frequency: true,
          unit: true,
          conditionOperator: true,
          benchmark: true,
          serviceUnits: {
            serviceUnit: true,
          },
          simpleMappings: {
            simple: true,
          },
        },
      });

      if (!full) {
        throw new BadRequestException('KPI not found after create');
      }

      // =========================
      // ✅ 7. MAP RESPONSE
      // =========================

      return KpiMapper.toResponse(full);
    });
  }
  async findAll(query: QueryKpiDto) {
    const {
      year,
      strategyRefId,
      organizationRefId,
      measureRefId,
      userId,
      page = 1,
      limit = 10,
    } = query;

    const currentYear = new Date().getFullYear();

    const qb = this.kpiRepo.createQueryBuilder('kpi');

    // =========================
    // CORE JOINS (ONLY WHAT LIST NEEDS)
    // =========================
    qb.leftJoinAndSelect('kpi.topic', 'topic');

    qb.leftJoinAndSelect('kpi.strategy', 'strategy');
    qb.leftJoinAndSelect('kpi.organization', 'organization');
    qb.leftJoinAndSelect('kpi.frequency', 'frequency');
    qb.leftJoinAndSelect('kpi.unit', 'unit');
    qb.leftJoinAndSelect('kpi.conditionOperator', 'conditionOperator');
    qb.leftJoinAndSelect('kpi.benchmark', 'benchmark');

    // arrays (important but still safe for list)
    qb.leftJoinAndSelect('kpi.serviceUnits', 'serviceUnits');
    qb.leftJoinAndSelect('serviceUnits.serviceUnit', 'serviceUnit');

    qb.leftJoinAndSelect('kpi.simpleMappings', 'simpleMappings');
    qb.leftJoinAndSelect('simpleMappings.simple', 'simple');

    // =========================
    // USER FILTER (OPTIONAL JOIN)
    // =========================
    if (userId) {
      qb.innerJoin(
        'kpi_user_roles',
        'kur',
        'kur.kpi_ref_id = kpi.id',
      ).andWhere('kur.user_ref_id = :userId', { userId });
    }

    // =========================
    // FILTER
    // =========================
    qb.where('kpi.year = :year', {
      year: year ?? currentYear,
    });

    if (strategyRefId) {
      qb.andWhere('kpi.strategy_ref_id = :strategyRefId', {
        strategyRefId,
      });
    }

    if (organizationRefId) {
      qb.andWhere('kpi.org_ref_id = :organizationRefId', {
        organizationRefId,
      });
    }

    if (measureRefId) {
      qb.andWhere('kpi.measure_ref_id = :measureRefId', {
        measureRefId,
      });
    }

    // =========================
    // PAGINATION
    // =========================
    qb.skip((page - 1) * limit).take(limit);

    // prevent duplicate rows from joins
    qb.distinct(true);
    qb.andWhere('kpi.is_active = true');
    // =========================
    // EXECUTE
    // =========================
    const [data, total] = await qb.getManyAndCount();

    // =========================
    // MAP
    // =========================
    const items = KpiListMapper.toResponseList(data);

    return {
      items,
      meta: {
        page,
        limit,
        total,
      },
    };
  }
  async findOne(id: number) {
    const kpi = await this.kpiRepo.findOne({
      where: { id, is_active: true },
      relations: {
        topic: true,
        strategy: true,
        organization: true,
        frequency: true,
        unit: true,
        conditionOperator: true,
        benchmark: true,

        serviceUnits: {
          serviceUnit: true,
        },

        simpleMappings: {
          simple: true,
        },

        userRoles: {
          user: true,
          role: true,
        },
      },
    });

    if (!kpi) {
      throw new NotFoundException(`KPI id=${id} not found`);
    }

    return KpiDetailMapper.toResponse(kpi);
  }

  async update(id: number, dto: UpdateKpiDto) {
    const entity = await this.kpiRepo.findOne({
      where: { id },
      relations: ['serviceUnits', 'simpleMappings', 'userRoles'],
    });

    if (!entity) {
      throw new NotFoundException('KPI not found');
    }
  const oldIsActive = entity.is_active;

    // =========================
    // 1. UPDATE SIMPLE FIELDS
    // =========================
    Object.assign(entity, {
      ...dto,
    });

     if (dto.is_active !== undefined && dto.is_active !== oldIsActive) {
    entity.deletedAt = dto.is_active ? null : new Date();
  }
    await this.kpiRepo.save(entity);

    // =========================
    // 2. UPDATE RELATIONS (ถ้ามี)
    // =========================

    // serviceUnits
    if (dto.serviceUnitRefIds) {
      await this.kpiServiceUnitRepo.delete({ kpiRefId: id });

      const newServiceUnits = dto.serviceUnitRefIds.map((suId) =>
        this.kpiServiceUnitRepo.create({
          kpiRefId: id,
          serviceUnitRefId: suId,
        }),
      );

      await this.kpiServiceUnitRepo.save(newServiceUnits);
    }

    // simpleMappings
    if (dto.simpleRefIds) {
      await this.kpiSimpleRepo.delete({ kpiRefId: id });

      const newSimples = dto.simpleRefIds.map((sId) =>
        this.kpiSimpleRepo.create({
          kpiRefId: id,
          simpleRefId: sId,
        }),
      );

      await this.kpiSimpleRepo.save(newSimples);
    }

    // userRoles
    if (dto.userRoles) {
      await this.kpiUserRoleRepo.delete({ kpiRefId: id });

      const newRoles = dto.userRoles.map((r) =>
        this.kpiUserRoleRepo.create({
          kpiRefId: id,
          userRefId: r.userRefId,
          roleRefId: r.roleRefId,
        }),
      );

      await this.kpiUserRoleRepo.save(newRoles);
    }

    // =========================
    // 3. RETURN
    // =========================
    const updated = await this.kpiRepo.findOne({
      where: { id },
      relations: [
        'topic',
        'strategy',
        'organization',
        'frequency',
        'unit',
        'conditionOperator',
        'benchmark',
        'serviceUnits',
        'serviceUnits.serviceUnit',
        'simpleMappings',
        'simpleMappings.simple',
        'userRoles',
        'userRoles.user',
        'userRoles.role',
      ],
    });
    if (!updated) {
      throw new NotFoundException('KPI not found after update');
    }
    return KpiDetailMapper.toResponse(updated);
  }
}