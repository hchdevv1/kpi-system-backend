import { Module } from '@nestjs/common';
import { KpiResultService } from './kpi-result.service';
import { KpiResultController } from './kpi-result.controller';

@Module({
  controllers: [KpiResultController],
  providers: [KpiResultService],
})
export class KpiResultModule {}
