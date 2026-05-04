import { Module } from '@nestjs/common';
import { KpiSimpleMappingsService } from './kpi_simple_mappings.service';
import { KpiSimpleMappingsController } from './kpi_simple_mappings.controller';

@Module({
  controllers: [KpiSimpleMappingsController],
  providers: [KpiSimpleMappingsService],
})
export class KpiSimpleMappingsModule {}
