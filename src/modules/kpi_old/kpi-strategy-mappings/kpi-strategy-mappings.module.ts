import { Module } from '@nestjs/common';
import { KpiStrategyMappingsService } from './kpi-strategy-mappings.service';
import { KpiStrategyMappingsController } from './kpi-strategy-mappings.controller';

@Module({
  controllers: [KpiStrategyMappingsController],
  providers: [KpiStrategyMappingsService],
})
export class KpiStrategyMappingsModule {}
