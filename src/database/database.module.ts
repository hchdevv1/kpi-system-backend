import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MstStrategy } from '../modules/strategy/entities/mst_strategy.entity';
import { MstStrategyGroup } from '../modules/strategy/entities/mst_strategy_group.entity';
import { MstOrganization } from '../modules/organization/entities/mst_organization.entity';
import { MstOrganizationGroup } from '../modules/organization/entities/mst_organization_group.entity';
import { MstMeasure } from '../modules/measure-category/entities/mst_measure.entity';
import { MstBenchmark } from '../modules/kpi-benchmark/entities/mst_benchmark.entity';
import { MstTopic } from '../modules/kpi-topic/entities/mst_topic.entity';
import { MstFrequency } from '../modules/frequency/entities/mst_frequency.entity';
import { MstConditionOperator } from '../modules/condition-operator/entities/mst_condition_operator.entity';
import { MstUnit } from '../modules/kpi-unit/entities/mst_kpi_unit.entity';
import { MstServiceUnitGroup } from '../modules/service-unit/entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from '../modules/service-unit/entities/mst_serviceunit.entity';
import { MstSimpleGroup } from '../modules/kpi-simple/entities/mst_simple_group.entity';
import { MstSimple } from '../modules/kpi-simple/entities/mst_simple.entity';

import { MstKpiRoles } from '../modules/roles/entities/utils_kpi_roles.entity';
import { MstSystemRoles } from '../modules/roles/entities/utils_system_roles.entity';
import { UserSystem } from '../modules/users/entities/users.entity';

import { KpiDirectory } from '../modules/kpi/kpi-directory/entities/kpi_directory.entity';
import { KpiResults } from '../modules/kpi/kpi-results/entities/kpi_results.entity';
import { KpiUserRoles } from '../modules/kpi/kpi-user-roles/entities/kpi_user_roles.entity';
import { KpiServiceUnits } from '../modules/kpi/kpi_service_units/entities/kpi_service_units.entity';
import { KpiSimpleMappings } from '../modules/kpi/kpi_simple_mappings/entities/kpi_simple_mappings.entity';
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
          KpiDirectory,
          KpiResults, KpiUserRoles,
          KpiServiceUnits, KpiSimpleMappings
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