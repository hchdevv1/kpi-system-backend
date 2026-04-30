import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MeasureCategoryModule } from './modules/measure-category/measure-category.module';
import { BenchmarkModule } from './modules/kpi-benchmark/benchmark.module';
import { KpiTopicModule } from './modules/kpi-topic/kpi-topic.module';
import { FrequencyModule } from './modules/frequency/frequency.module';
import { ConditionOperatorModule } from './modules/condition-operator/condition-operator.module';
import { KpiUnitModule } from './modules/kpi-unit/kpi-unit.module';
import { ServiceUnitModule } from './modules/service-unit/service-unit.module';
import { KpiSimpleModule } from './modules/kpi-simple/kpi-simple.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { KpiUserRolesModule } from './modules/kpi/kpi-user-roles/kpi-user-roles.module';
import { KpiResultsModule } from './modules/kpi/kpi-results/kpi-results.module';
import { KpiDirectoryModule } from './modules/kpi/kpi-directory/kpi-directory.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    StrategyModule,
    OrganizationModule,
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
    KpiDirectoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
