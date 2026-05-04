import { Module } from '@nestjs/common';
import { KpiServiceUnitsService } from './kpi_service_units.service';
import { KpiServiceUnitsController } from './kpi_service_units.controller';

@Module({
  controllers: [KpiServiceUnitsController],
  providers: [KpiServiceUnitsService],
})
export class KpiServiceUnitsModule {}
