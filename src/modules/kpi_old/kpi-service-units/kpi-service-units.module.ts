import { Module } from '@nestjs/common';
import { KpiServiceUnitsService } from './kpi-service-units.service';
import { KpiServiceUnitsController } from './kpi-service-units.controller';

@Module({
  controllers: [KpiServiceUnitsController],
  providers: [KpiServiceUnitsService],
})
export class KpiServiceUnitsModule {}
