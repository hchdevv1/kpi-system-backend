import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { DataSource } from 'typeorm';

import { KpiDataEntry } from './entities/kpi-data-entry.entity';

import { KpiDataEntryResponseDto } from './dto/create-kpi-data-entry-response.dto';
import { CreateKpiDataEntryDto } from './dto/create-kpi-data-entry.dto';

import { KpiDataEntryMapper } from './mappers/kpi-data-entry.mapper';

@Injectable()
export class KpiDataEntryService {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async create(
    dto: CreateKpiDataEntryDto,
  ): Promise<KpiDataEntryResponseDto> {
    return this.dataSource.transaction(async (manager) => {

      // =========================
      // 1. CREATE DATA ENTRY
      // =========================

      const entry = manager.create(KpiDataEntry, {
        kpiDefinitionId: dto.kpiDefinitionId,

        kpiDefYear: dto.kpiDefYear,
        kpiDefMonth: dto.kpiDefMonth,

        numeratorValue: dto.numeratorValue,
        denominatorValue: dto.denominatorValue,

        // =========================
        // AUDIT USER
        // =========================

        createdBy: dto.userId,
        updatedBy: dto.userId,
      });

      const saved = await manager.save(
        KpiDataEntry,
        entry,
      );

      // =========================
      // 2. RELOAD
      // =========================

      const full = await manager.findOne(
        KpiDataEntry,
        {
          where: {
            id: saved.id,
          },

          relations: {
            kpiDefinition: true,

            createdByUser: true,
            updatedByUser: true,
          },
        },
      );

      if (!full) {
        throw new BadRequestException(
          'Create KPI Data Entry failed',
        );
      }

      return KpiDataEntryMapper.toResponse(full);
    });
  }
}