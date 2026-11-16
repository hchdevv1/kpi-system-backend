
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiSummaryController } from './kpi-summary.controller';
import { KpiSummaryService } from './kpi-summary.service';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';
import { KpiOrganizationMappings } from '../kpi-organization-mappings/entities/kpi_organization_mappings.entity';
import { KpiServiceUnitsMappings } from '../kpi-service-unit-mappings/entities/kpi_service_units_mappings.entity';
import { KpiSimpleMappings } from '../kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import { KpiStrategyMappings } from '../kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import { KpiUserRolesMappings } from '../kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';

import { UserSystem } from '../../users/entities/users.entity';
import { MstKpiRoles } from '../../roles/entities/utils_kpi_roles.entity';
import { MstTopic } from '../../topic/entities/mst_topic.entity';
import { MstStrategy } from '../../strategy/entities/mst_strategy.entity';
import { MstStrategyGroup } from '../../strategy/entities/mst_strategy_group.entity';
import { MstOrganization } from '../../organization/entities/mst_organization.entity';
import { MstOrganizationGroup } from '../../organization/entities/mst_organization_group.entity';
import { MstSimple } from '../../simple/entities/mst_simple.entity';
import { MstSimpleGroup } from '../../simple/entities/mst_simple_group.entity';
import { MstServiceUnit } from '../../service-unit/entities/mst_serviceunit.entity';
import { MstServiceUnitGroup } from '../../service-unit/entities/mst_serviceunit_group.entity';
import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';
import { KpiCalculationService } from '../kpi-result/services/kpi-calculation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KpiDefinition,
      KpiOrganizationMappings,
      KpiServiceUnitsMappings,
      KpiSimpleMappings,
      KpiStrategyMappings,
      KpiUserRolesMappings,
      UserSystem,
      MstKpiRoles,
      MstTopic,
      MstStrategy,
      MstStrategyGroup,
      MstOrganization,
      MstOrganizationGroup,
      MstSimple,
      MstSimpleGroup,
      MstServiceUnit,
      MstServiceUnitGroup,
      KpiDataEntry,
      KpiCalculationService,
    ]),
  ],
  controllers: [KpiSummaryController],
  providers: [KpiSummaryService ,KpiCalculationService],
  exports: [KpiSummaryService],
})
export class KpiSummaryModule {}
