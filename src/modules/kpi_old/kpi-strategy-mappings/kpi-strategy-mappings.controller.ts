import { Controller } from '@nestjs/common';
import { KpiStrategyMappingsService } from './kpi-strategy-mappings.service';

@Controller('kpi-strategy-mappings')
export class KpiStrategyMappingsController {
  constructor(private readonly kpiStrategyMappingsService: KpiStrategyMappingsService) {}
}
