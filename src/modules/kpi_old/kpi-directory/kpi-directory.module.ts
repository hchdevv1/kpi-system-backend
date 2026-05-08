import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiDirectoryService } from './kpi-directory.service';
import { KpiDirectoryController } from './kpi-directory.controller';
import { KpiDirectory} from './entities/kpi-directory.entity';
import { CommonModule} from '../../../common/common.module';
import { KpiServiceUnits } from '../kpi-service-units/entities/kpi_service_units.entity';
import { KpiSimpleMappings } from '../kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import { KpiStrategyMappings} from '../kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import { KpiUserRoles } from '../kpi-user-roles/entities/kpi_user_roles.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([
          KpiDirectory,
          KpiServiceUnits,KpiSimpleMappings,KpiUserRoles,
          KpiStrategyMappings
        ]),
        CommonModule
      ],
  controllers: [KpiDirectoryController],
  providers: [KpiDirectoryService],
})
export class KpiDirectoryModule {}
