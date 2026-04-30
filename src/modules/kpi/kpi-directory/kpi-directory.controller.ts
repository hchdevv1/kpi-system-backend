import { Controller } from '@nestjs/common';
import { KpiDirectoryService } from './kpi-directory.service';

@Controller('kpi-directory')
export class KpiDirectoryController {
  constructor(private readonly kpiDirectoryService: KpiDirectoryService) {}
}
