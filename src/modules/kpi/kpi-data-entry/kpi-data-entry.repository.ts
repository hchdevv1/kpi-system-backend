import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class KpiDataEntryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getYearAggregate(kpiIds: number[], year: number) {
    return this.dataSource
      .getRepository('kpi_data_entry')
      .createQueryBuilder('e')
      .select('e.kpiDefinitionId', 'kpiId')
      .addSelect('SUM(e.numeratorValue)', 'numeratorSum')
      .addSelect('SUM(e.denominatorValue)', 'denominatorSum')
      .addSelect('MAX(e.kpiDefMonth)', 'lastMonth')
      .where('e.kpiDefinitionId IN (:...kpiIds)', { kpiIds })
      .andWhere('e.kpiDefYear = :year', { year })
      .groupBy('e.kpiDefinitionId')
      .getRawMany();
  }
}