import { LatestResultDto } from '../dto/kpi-result-list-response.dto';

export interface LatestMapValue {
  month: number;
  year: number;
  numeratorValue: number;
  denominatorValue?: number;
  calculatedValue: number;
  currentPassStatus?: boolean;
  yearlyCalculated?: number;
}

export type LatestResultMap = Map<number, LatestMapValue>;