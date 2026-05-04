import { Controller } from '@nestjs/common';
import { KpiSimpleMappingsService } from './kpi_simple_mappings.service';

@Controller('kpi-simple-mappings')
export class KpiSimpleMappingsController {
  constructor(private readonly kpiSimpleMappingsService: KpiSimpleMappingsService) {}
}
