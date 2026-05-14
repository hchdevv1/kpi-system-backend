import { Module } from '@nestjs/common';
import { KpiResultService } from './kpi-result.service';
import { KpiResultController } from './kpi-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';
import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';
import { KpiCalculationService } from './services/kpi-calculation.service';

@Module({
   imports: [TypeOrmModule.forFeature([KpiDefinition, KpiDataEntry])],
  controllers: [KpiResultController],
  providers: [KpiResultService,KpiCalculationService],
})
export class KpiResultModule {}
