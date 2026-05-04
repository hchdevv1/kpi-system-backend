import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiDirectoryService } from './kpi-directory.service';
import { KpiDirectoryController } from './kpi-directory.controller';
import { KpiDirectory} from './entities/kpi_directory.entity';
import { CommonModule} from '../../../common/common.module';
import { KpiServiceUnits } from '../kpi_service_units/entities/kpi_service_units.entity';
import { KpiSimpleMappings } from '../kpi_simple_mappings/entities/kpi_simple_mappings.entity';
import { KpiUserRoles } from '../kpi-user-roles/entities/kpi_user_roles.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([
          KpiDirectory,
          KpiServiceUnits,KpiSimpleMappings,KpiUserRoles
        ]),
        CommonModule
      ],
  controllers: [KpiDirectoryController],
  providers: [KpiDirectoryService],
})
export class KpiDirectoryModule {}
