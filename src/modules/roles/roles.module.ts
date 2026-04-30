import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MstKpiRoles} from './entities/utils_kpi_roles.entity';
import {MstSystemRoles} from './entities/utils_system_roles.entity';
import { CommonModule} from '../../common/common.module';
@Module({
   imports: [
              TypeOrmModule.forFeature([
                MstKpiRoles,MstSystemRoles
              ]),
             CommonModule
            ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
