import { Controller } from '@nestjs/common';
import { KpiServiceUnitsService } from './kpi_service_units.service';

@Controller('kpi-service-units')
export class KpiServiceUnitsController {
  constructor(private readonly kpiServiceUnitsService: KpiServiceUnitsService) {}
}
