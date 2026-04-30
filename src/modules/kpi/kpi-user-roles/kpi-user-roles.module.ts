import { Module } from '@nestjs/common';
import { KpiUserRolesService } from './kpi-user-roles.service';
import { KpiUserRolesController } from './kpi-user-roles.controller';

@Module({
  controllers: [KpiUserRolesController],
  providers: [KpiUserRolesService],
})
export class KpiUserRolesModule {}
