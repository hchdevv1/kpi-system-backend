import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiUnitService } from './kpi-unit.service';
import { KpiUnitController } from './kpi-unit.controller';
import { MstUnit} from './entities/mst_kpi_unit.entity';
import { CommonModule } from '../../common/common.module';
@Module({
    imports: [
                TypeOrmModule.forFeature([
                  MstUnit,
                ]),
               CommonModule
              ],
  controllers: [KpiUnitController],
  providers: [KpiUnitService],
})
export class KpiUnitModule {}
