import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KpiCalculationService } from './services/kpi-calculation.service';
import { KpiResultMapper } from './mappers/kpi-result.mapper';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';

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
  ) {}

  async findAll(query: QueryKpiResultDto) {
    // =========================
    // YEAR DEFAULT
    // =========================
    const year = query.year ?? new Date().getFullYear();

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
      ],
    });

    const kpiIds = kpis.map((k) => k.id);

    // =========================
    // 2. SQL AGGREGATION (FAST)
    // =========================
    const aggregates = await this.entryRepo
      .createQueryBuilder('e')
      .select('e.kpiDefinitionId', 'kpiId')
      .addSelect('SUM(e.numeratorValue)', 'numeratorSum')
      .addSelect('SUM(e.denominatorValue)', 'denominatorSum')
      .addSelect('MAX(e.kpiDefMonth)', 'lastMonth')
      .where('e.kpiDefinitionId IN (:...kpiIds)', { kpiIds })
      .andWhere('e.kpiDefYear = :year', { year })
      .groupBy('e.kpiDefinitionId')
      .getRawMany();

    const aggregateMap = new Map<number, any>();

    for (const a of aggregates) {
      aggregateMap.set(Number(a.kpiId), {
        numeratorSum: Number(a.numeratorSum ?? 0),
        denominatorSum: Number(a.denominatorSum ?? 0),
        lastMonth: Number(a.lastMonth ?? 0),
      });
    }

    // =========================
    // 3. BUILD RESULT
    // =========================
    const latestResultMap = new Map<number, any>();

    for (const kpi of kpis) {
      const agg = aggregateMap.get(kpi.id);

      let yearlyCalculated = 0;
      let latest = null;

      if (agg) {
        const numeratorSum = agg.numeratorSum;
        const denominatorSum = agg.denominatorSum;

        const unit = kpi.unit;

        // =========================
        // KPI RULE ENGINE (U001/U002/U003)
        // =========================
        if (unit.code === 'U001') {
          yearlyCalculated = numeratorSum;
        } else if (denominatorSum === 0) {
          yearlyCalculated = 0;
        } else {
          const multiplier = Number(unit.scale_factor ?? 1);
          yearlyCalculated =
            (numeratorSum / denominatorSum) * multiplier;
        }

        const currentPassStatus =
          this.calc.calculateCurrentPassStatus(
            yearlyCalculated,
            kpi.targetValue,
            kpi.conditionOperator?.symbol ?? undefined,
          );

        latest = {
          month: agg.lastMonth,
          year,
          numeratorValue: numeratorSum,
          denominatorValue: denominatorSum,
          calculatedValue: yearlyCalculated,
          currentPassStatus,
        };
      }

      latestResultMap.set(kpi.id, {
        ...latest,
        yearlyCalculated,
      });
    }

    // =========================
    // 4. MAP RESPONSE
    // =========================
    return KpiResultMapper.toResponseList(
      kpis,
      latestResultMap,
    );
  }
}