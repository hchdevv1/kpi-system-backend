import { Module } from '@nestjs/common';
import { KpiResultsService } from './kpi-results.service';
import { KpiResultsController } from './kpi-results.controller';

@Module({
  controllers: [KpiResultsController],
  providers: [KpiResultsService],
})
export class KpiResultsModule {}
