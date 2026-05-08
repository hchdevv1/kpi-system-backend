import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiDefinitionService } from './kpi-definition.service';
import { KpiDefinitionController } from './kpi-definition.controller';
import {KpiDefinition} from './entities/kpi-definition.entity';
import { CommonModule} from '../../../common/common.module';

import {KpiOrganizationMappings} from '../kpi-organization-mappings/entities/kpi_organization_mappings.entity';
import {KpiServiceUnitsMappings} from '../kpi-service-unit-mappings/entities/kpi_service_units_mappings.entity';
import {KpiSimpleMappings} from '../kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import {KpiStrategyMappings} from '../kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import {KpiUserRolesMappings} from '../kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';

@Module({
   imports: [
          TypeOrmModule.forFeature([
            KpiDefinition,
           KpiOrganizationMappings,KpiServiceUnitsMappings,KpiSimpleMappings,
           KpiStrategyMappings,KpiUserRolesMappings
          ]),
          CommonModule
        ],
  controllers: [KpiDefinitionController],
  providers: [KpiDefinitionService],
})
export class KpiDefinitionModule {}
