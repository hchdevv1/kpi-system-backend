import { Module } from '@nestjs/common';
import { KpiSimpleMappingsService } from './kpi-simple-mappings.service';
import { KpiSimpleMappingsController } from './kpi-simple-mappings.controller';

@Module({
  controllers: [KpiSimpleMappingsController],
  providers: [KpiSimpleMappingsService],
})
export class KpiSimpleMappingsModule {}
