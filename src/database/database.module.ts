import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MstStrategy } from '../modules/strategy/entities/mst_strategy.entity';
import { MstStrategyGroup } from '../modules/strategy/entities/mst_strategy_group.entity';
import { MstOrganization } from '../modules/organization/entities/mst_organization.entity';
import { MstOrganizationGroup } from '../modules/organization/entities/mst_organization_group.entity';
import { MstMeasure } from '../modules/measure-category/entities/mst_measure.entity';
import { MstBenchmark } from '../modules/benchmark/entities/mst_benchmark.entity';
import { MstTopic } from '../modules/topic/entities/mst_topic.entity';
import { MstFrequency } from '../modules/frequency/entities/mst_frequency.entity';
import { MstConditionOperator } from '../modules/condition-operator/entities/mst_condition_operator.entity';
import { MstUnit } from '../modules/unit/entities/mst_kpi_unit.entity';
import { MstServiceUnitGroup } from '../modules/service-unit/entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from '../modules/service-unit/entities/mst_serviceunit.entity';
import { MstSimpleGroup } from '../modules/simple/entities/mst_simple_group.entity';
import { MstSimple } from '../modules/simple/entities/mst_simple.entity';

import { MstKpiRoles } from '../modules/roles/entities/utils_kpi_roles.entity';
import { MstSystemRoles } from '../modules/roles/entities/utils_system_roles.entity';
import { UserSystem } from '../modules/users/entities/users.entity';

import { KpiDefinition } from '../modules/kpi/kpi-definition/entities/kpi-definition.entity';
import { KpiOrganizationMappings } from '../modules/kpi/kpi-organization-mappings/entities/kpi_organization_mappings.entity';
import { KpiServiceUnitsMappings } from '../modules/kpi/kpi-service-unit-mappings/entities/kpi_service_units_mappings.entity';
import { KpiSimpleMappings } from '../modules/kpi/kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import { KpiStrategyMappings } from '../modules/kpi/kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import { KpiUserRolesMappings } from '../modules/kpi/kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';
import {KpiDataEntry} from '../modules/kpi/kpi-data-entry/entities/kpi-data-entry.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<number>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [
          MstKpiRoles, MstSystemRoles,
          MstStrategy, MstStrategyGroup,
          MstOrganization, MstOrganizationGroup,
          MstMeasure, MstBenchmark,
          MstTopic, MstFrequency,
          MstConditionOperator, MstUnit,
          MstServiceUnitGroup, MstServiceUnit,
          MstSimpleGroup, MstSimple,
          UserSystem,
          KpiDefinition,
          KpiOrganizationMappings, KpiServiceUnitsMappings,
          KpiSimpleMappings, KpiStrategyMappings,
          KpiUserRolesMappings,
          KpiDataEntry
        ],
        //entities: [__dirname + '/entities/*.entity{.ts,.js}'],

        //autoLoadEntities:true, //auto load entities
        synchronize: false, // 
        logging: true,

        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: false,
      }),
    }),
  ],
})
export class DatabaseModule { }