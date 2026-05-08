import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MeasureCategoryModule } from './modules/measure-category/measure-category.module';
import { BenchmarkModule } from './modules/benchmark/benchmark.module';
import { KpiTopicModule } from './modules/topic/kpi-topic.module';
import { FrequencyModule } from './modules/frequency/frequency.module';
import { ConditionOperatorModule } from './modules/condition-operator/condition-operator.module';
import { KpiUnitModule } from './modules/unit/kpi-unit.module';
import { ServiceUnitModule } from './modules/service-unit/service-unit.module';
import { KpiSimpleModule } from './modules/simple/kpi-simple.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { KpiUserRolesModule } from './modules/kpi_old/kpi-user-roles/kpi-user-roles.module';
import { KpiResultsModule } from './modules/kpi_old/kpi-results/kpi-results.module';
import { KpiServiceUnitsModule } from './modules/kpi_old/kpi-service-units/kpi-service-units.module';
import { KpiSimpleMappingsModule } from './modules/kpi_old/kpi-simple-mappings/kpi-simple-mappings.module';
import { AuthModule } from './modules/auth/auth.module';
import { KpiStrategyMappingsModule } from './modules/kpi_old/kpi-strategy-mappings/kpi-strategy-mappings.module';
import { KpiDefinitionModule } from './modules/kpi/kpi-definition/kpi-definition.module';
import { KpiDataEntryModule } from './modules/kpi/kpi-data-entry/kpi-data-entry.module';
import { KpiResultModule } from './modules/kpi/kpi-result/kpi-result.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrganizationModule,
    StrategyModule,
    MeasureCategoryModule,
    BenchmarkModule,
    KpiTopicModule,
    FrequencyModule,
    ConditionOperatorModule,
    KpiUnitModule,
    ServiceUnitModule,
    KpiSimpleModule,
    UsersModule,
    RolesModule,
    KpiUserRolesModule,
    KpiResultsModule,
    //KpiDirectoryModule,
    KpiServiceUnitsModule,
    KpiSimpleMappingsModule,
    AuthModule,
    KpiStrategyMappingsModule,
    KpiDefinitionModule,
    KpiDataEntryModule,
    KpiResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
