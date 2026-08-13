// src/modules/kpi/kpi-result/kpi-result.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { KpiCalculationService } from './services/kpi-calculation.service';
import { KpiResultMapper } from './mappers/kpi-result.mapper';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';
import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';

import {
  LatestMapValue,
  LatestResultMap,
} from './types/kpi-result.types';

@Injectable()
export class KpiResultService {
  constructor(
    private readonly calc: KpiCalculationService,

    @InjectRepository(KpiDefinition)
    private readonly kpiRepo: Repository<KpiDefinition>,

    @InjectRepository(KpiDataEntry)
    private readonly entryRepo: Repository<KpiDataEntry>,
  ) { }

  async findAll(query: QueryKpiResultDto) {
    // =========================
    // DEFAULT
    // =========================
    const year =
      query.year ?? new Date().getFullYear();

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    // =========================
    // QUERY BUILDER
    // =========================
    const qb = this.kpiRepo
      .createQueryBuilder('kpi')
      .distinct(true)

      // =========================
      // RELATIONS
      // =========================
      .leftJoinAndSelect('kpi.topic', 'topic')

      .leftJoinAndSelect(
        'kpi.frequency',
        'frequency',
      )

      .leftJoinAndSelect(
        'kpi.measureCategory',
        'measureCategory',
      )

      .leftJoinAndSelect('kpi.unit', 'unit')

      .leftJoinAndSelect(
        'kpi.conditionOperator',
        'conditionOperator',
      )

      .leftJoinAndSelect(
        'kpi.benchmark',
        'benchmark',
      )

      // =========================
      // STRATEGY
      // =========================
      .leftJoinAndSelect(
        'kpi.kpiStrategies',
        'kpiStrategies',
      )

      .leftJoinAndSelect(
        'kpiStrategies.strategy',
        'strategy',
      )

      .leftJoinAndSelect(
        'strategy.strategyGroup',
        'strategyGroup',
      )

      // =========================
      // ORGANIZATION
      // =========================
      .leftJoinAndSelect(
        'kpi.kpiOrganizations',
        'kpiOrganizations',
      )

      .leftJoinAndSelect(
        'kpiOrganizations.organization',
        'organization',
      )

      .leftJoinAndSelect(
        'organization.organizationGroup',
        'organizationGroup',
      )

      // =========================
      // SERVICE UNIT
      // =========================
      .leftJoinAndSelect(
        'kpi.kpiServiceUnits',
        'kpiServiceUnits',
      )

      .leftJoinAndSelect(
        'kpiServiceUnits.serviceUnit',
        'serviceUnit',
      )

      .leftJoinAndSelect(
        'serviceUnit.serviceUnitGroup',
        'serviceUnitGroup',
      )

      // =========================
      // SIMPLE
      // =========================
      .leftJoinAndSelect(
        'kpi.kpiSimples',
        'kpiSimples',
      )

      .leftJoinAndSelect(
        'kpiSimples.simple',
        'simple',
      )

      .leftJoinAndSelect(
        'simple.kpisimplegroup',
        'simpleGroup',
      )

      // =========================
      // USER ROLE
      // =========================
      .leftJoinAndSelect(
        'kpi.userRoles',
        'userRoles',
      )

      .leftJoinAndSelect(
        'userRoles.role',
        'role',
      )

      .leftJoinAndSelect(
        'userRoles.user',
        'roleUser',
      );

    // =========================
    // FILTER : YEAR
    // =========================
    qb.andWhere('kpi.kpi_year = :year', {
      year,
    });

    // =========================
    // FILTER : USER
    // =========================
    if (
      query.userId &&
      query.editKpiUser === false
    ) {
      qb.andWhere(
        'userRoles.userId = :userId',
        {
          userId: query.userId,
        },
      );
    }

    // =========================
    // FILTER : ADMIN
    // =========================
    if (
      query.userId &&
      query.editKpiUser === true
    ) {
      qb.andWhere(
        'userRoles.userId != :userId',
        {
          userId: query.userId,
        },
      );
    }

// FILTER : SERVICE UNIT
// =========================
// =========================
// FILTER : SERVICE UNIT
// =========================
if (query.serviceunit_id) {
  qb.innerJoin(
    'kpi.kpiServiceUnits',
    'filterServiceUnit',
  );

  qb.andWhere(
    'filterServiceUnit.serviceUnitId = :serviceunitId',
    {
      serviceunitId: query.serviceunit_id,
    },
  );
}
    // =========================
    // FILTER : MEASURE
    // =========================
    if (query.measureRefId) {
      qb.andWhere(
        'kpi.measure_ref_id = :measureRefId',
        {
          measureRefId: query.measureRefId,
        },
      );
    }
    // =========================
    // FILTER : KPI GROUP
    // =========================
    if (query.kpiGroup) {
      switch (query.kpiGroup) {
        // =====================
        // STRATEGY
        // =====================
        case 'strategy':
          qb.innerJoin(
            'kpi.kpiStrategies',
            'ks',
          );
          break;

        // =====================
        // ORGANIZATION
        // =====================
        case 'organization':
          qb.innerJoin(
            'kpi.kpiOrganizations',
            'ko',
          );
          break;

        // =====================
        // SIMPLE
        // =====================
        case 'simple':
          qb.innerJoin(
            'kpi.kpiSimples',
            'ksm',
          );
          break;

        // =====================
        // SERVICE UNIT GROUP
        // =====================
        case 'PCT':
        case 'CoE':
        case 'Location':
          qb.innerJoin(
            'kpi.kpiServiceUnits',
            'ksu',
          )
            .innerJoin(
              'ksu.serviceUnit',
              'su',
            )
            .innerJoin(
              'su.serviceUnitGroup',
              'sug',
            )
            .andWhere(
              'sug.description = :group',
              {
                group: query.kpiGroup,
              },
            );
          break;
      }
    }

    // =========================
    // PAGINATION
    // =========================
    qb.skip((page - 1) * limit);
    qb.take(limit);

    // =========================
    // EXECUTE
    // =========================
    const [kpis] =
      await qb.getManyAndCount();

    // =========================
    // KPI IDs
    // =========================
    const kpiIds = kpis.map((k) => k.id);

    if (kpiIds.length === 0) {
      return [];
    }

    // =========================
    // LOAD DATA ENTRY
    // =========================
    const entries = await this.entryRepo.find({
      where: {
        kpiDefinitionId: In(kpiIds),
        kpiDefYear: year,
      },
      relations: [
        'updatedByUser',
      ],
      order: {
        kpiDefMonth: 'ASC',
      },
    });

    // =========================
    // GROUP ENTRY
    // =========================
    const entryMap =
      new Map<number, KpiDataEntry[]>();

    for (const entry of entries) {
      if (
        !entryMap.has(entry.kpiDefinitionId)
      ) {
        entryMap.set(
          entry.kpiDefinitionId,
          [],
        );
      }

      entryMap
        .get(entry.kpiDefinitionId)!
        .push(entry);
    }

    // =========================
    // BUILD RESULT MAP
    // =========================
    const latestResultMap: LatestResultMap =
      new Map();

    for (const kpi of kpis) {
      const kpiEntries =
        entryMap.get(kpi.id) ?? [];

      if (kpiEntries.length === 0) {
        latestResultMap.set(kpi.id, {
          month: 0,
          year,
          numeratorValue: 0,
          denominatorValue: 0,
          calculatedValue: 0,
          currentPassStatus: false,
          yearlyCalculated: 0,
        });

        continue;
      }

      // =========================
      // LATEST ENTRY
      // =========================
      const latestEntry =
        kpiEntries[kpiEntries.length - 1];

      // =========================
      // LATEST VALUE
      // =========================
      const calculatedValue =
        this.calc.calculateValue(
          latestEntry,
          kpi.unit,
        );

      // =========================
      // PASS STATUS
      // =========================
      const currentPassStatus =
        this.calc.calculateCurrentPassStatus(
          calculatedValue,
          kpi.targetValue,
          kpi.conditionOperator?.symbol ??
          undefined,
        );

      // =========================
      // YEARLY AGGREGATE
      // =========================
      const yearlyCalculated =
        this.calc.calculateYearlyAggregate(
          kpiEntries,
          kpi.unit,
        );

      const latestValue: LatestMapValue = {
        month: latestEntry.kpiDefMonth,
        year: latestEntry.kpiDefYear,

        numeratorValue:
          latestEntry.numeratorValue,

        denominatorValue:
          latestEntry.denominatorValue,

        calculatedValue,

        currentPassStatus,

        yearlyCalculated,

        entry: latestEntry,
      };

      latestResultMap.set(
        kpi.id,
        latestValue,
      );
    }

    // =========================
    // RESPONSE
    // =========================
    return KpiResultMapper.toResponseList(
      kpis,
      latestResultMap,
    );
  }
}