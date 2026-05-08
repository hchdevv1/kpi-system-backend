import { Controller } from '@nestjs/common';
import { KpiResultsService } from './kpi-results.service';

@Controller('kpi-results')
export class KpiResultsController {
  constructor(private readonly kpiResultsService: KpiResultsService) {}
}
