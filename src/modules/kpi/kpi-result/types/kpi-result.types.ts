import { KpiDataEntry } from '../../kpi-data-entry/entities/kpi-data-entry.entity';

export interface LatestMapValue {
  // =========================
  // LATEST RESULT
  // =========================

  month?: number;
  year?: number;

  numeratorValue?: number;
  denominatorValue?: number;

  calculatedValue?: number;

  currentPassStatus?: boolean;

  // =========================
  // YEARLY AGGREGATE
  // =========================

  yearlyCalculated: number;

  // =========================
  // LATEST ENTRY OBJECT
  // =========================

  entry?: KpiDataEntry | null;
}

export type LatestResultMap = Map<number, LatestMapValue>;