 
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In } from 'typeorm';

import { KpiCalculationService } from './services/kpi-calculation.service';

import { KpiResultMapper } from './mappers/kpi-result.mapper';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';

import {
  LatestResultMap,
  LatestMapValue,
} from './types/kpi-result.types';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';

import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';

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
    console.log(query)
    // =========================
    // YEAR DEFAULT
    // =========================

    const year =
      query.year ?? new Date().getFullYear();

    // =========================
    // 1. LOAD KPI DEFINITION
    // =========================

    const kpis = await this.kpiRepo.find({
      relations: [
        'topic',
        'frequency',
        'unit',
        'conditionOperator',
        'benchmark',
        'kpiStrategies.strategy.strategyGroup',
        'kpiOrganizations.organization.organizationGroup',
        'kpiServiceUnits.serviceUnit.serviceUnitGroup',
        'kpiSimples.simple.kpisimplegroup',
        'userRoles',
        'userRoles.user',
        'userRoles.role',
      ],
    });

    const kpiIds = kpis.map((k) => k.id);

    // =========================
    // 2. LOAD KPI ENTRIES
    // =========================

    const entries = await this.entryRepo.find({
      where: {
        kpiDefYear: year,
        kpiDefinitionId: In(kpiIds),
      },

      relations: [
        'updatedByUser',
      ],

      order: {
        kpiDefMonth: 'ASC',
      },
    });

    // =========================
    // 3. GROUP ENTRY
    // =========================

    const entryMap =
      new Map<number, KpiDataEntry[]>();

    for (const entry of entries) {
      if (!entryMap.has(entry.kpiDefinitionId)) {
        entryMap.set(entry.kpiDefinitionId, []);
      }

      entryMap
        .get(entry.kpiDefinitionId)!
        .push(entry);
    }

    // =========================
    // 4. BUILD RESULT MAP
    // =========================

    const latestResultMap: LatestResultMap =
      new Map<number, LatestMapValue>();

    for (const kpi of kpis) {
      const kpiEntries =
        entryMap.get(kpi.id) ?? [];

      // =========================
      // NO DATA ENTRY
      // =========================

      if (kpiEntries.length === 0) {
        latestResultMap.set(kpi.id, {
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
      // CALCULATE LATEST
      // =========================

      const latestCalculated =
        this.calc.calculateValue(
          latestEntry,
          kpi.unit,
        );

      // =========================
      // YEARLY AGGREGATE
      // =========================

      const yearlyCalculated =
        this.calc.calculateYearlyAggregate(
          kpiEntries,
          kpi.unit,
        );

      // =========================
      // CURRENT PASS STATUS
      // =========================

      const currentPassStatus =
        this.calc.calculateCurrentPassStatus(
          latestCalculated,
          kpi.targetValue,
          kpi.conditionOperator?.symbol ??
          undefined,
        );

      // =========================
      // BUILD MAP
      // =========================

      latestResultMap.set(kpi.id, {
        month: latestEntry.kpiDefMonth,

        year: latestEntry.kpiDefYear,

        numeratorValue:
          latestEntry.numeratorValue,

        denominatorValue:
          latestEntry.denominatorValue,

        calculatedValue:
          latestCalculated,

        currentPassStatus,

        yearlyCalculated,

        entry: latestEntry,
      });
    }

    // =========================
    // 5. RESPONSE
    // =========================

    return KpiResultMapper.toResponseList(
      kpis,
      latestResultMap,
    );
  }
}