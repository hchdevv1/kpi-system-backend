import { Injectable, BadRequestException } from '@nestjs/common';
import { MstUnit } from '../../../unit/entities/mst_kpi_unit.entity';
import { KpiDataEntry } from '../../kpi-data-entry/entities/kpi-data-entry.entity';
import { LatestResultDto } from '../dto/kpi-result-list-response.dto';

@Injectable()
export class KpiCalculationService {
  // =========================
  // SINGLE VALUE
  // =========================
  calculateValue(entry: KpiDataEntry, unit: MstUnit): number {
    const numerator = entry.numeratorValue ?? 0;
    const denominator = entry.denominatorValue ?? 0;

    if (unit.code === 'U001') {
      return numerator;
    }

    if (denominator === 0) {
      return 0;
    }

    const multiplier = Number(unit.scale_factor ?? 1);

    return (numerator / denominator) * multiplier;
  }

  // =========================
  // YEAR AGGREGATE (OPTION C)
  // =========================
  calculateYearlyAggregate(entries: KpiDataEntry[], unit: MstUnit): number {
    const numeratorSum = entries.reduce(
      (s, e) => s + (e.numeratorValue ?? 0),
      0,
    );

    const denominatorSum = entries.reduce(
      (s, e) => s + (e.denominatorValue ?? 0),
      0,
    );

    if (unit.code === 'U001') return numeratorSum;

    if (denominatorSum === 0) return 0;

    const multiplier = Number(unit.scale_factor ?? 1);

    return (numeratorSum / denominatorSum) * multiplier;
  }

  // =========================
  // PASS / FAIL
  // =========================
  calculateCurrentPassStatus(
    value: number,
    target?: number,
    symbol?: string,
  ): boolean {
    if (!target) return false;

    switch (symbol?.trim()) {
      case '>':
        return value > target;
      case '>=':
        return value >= target;
      case '=':
        return value === target;
      case '<':
        return value < target;
      case '<=':
        return value <= target;
      default:
        return value >= target;
    }
  }

  // =========================
  // DTO BUILDER
  // =========================
  buildLatestResult(
    month: number,
    year: number,
    calculatedValue: number,
    entry: KpiDataEntry,
    currentPassStatus: boolean,
  ): LatestResultDto {
    return {
      month,
      year,
      numeratorValue: entry.numeratorValue,
      denominatorValue: entry.denominatorValue,
      calculatedValue,
      currentPassStatus,
    };
  }

  validateDenominator(denominator?: number): void {
    if (denominator === 0) {
      throw new BadRequestException('Denominator cannot be 0');
    }
  }
}