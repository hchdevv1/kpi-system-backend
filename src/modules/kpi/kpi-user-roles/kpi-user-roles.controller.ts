import { Controller } from '@nestjs/common';
import { KpiUserRolesService } from './kpi-user-roles.service';

@Controller('kpi-user-roles')
export class KpiUserRolesController {
  constructor(private readonly kpiUserRolesService: KpiUserRolesService) {}
}
