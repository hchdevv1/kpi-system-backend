import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpiDataEntryService } from './kpi-data-entry.service';
import { KpiDataEntryController } from './kpi-data-entry.controller';
import {KpiDataEntry} from './entities/kpi-data-entry.entity';
import { CommonModule} from '../../../common/common.module';
@Module({ imports: [
          TypeOrmModule.forFeature([
          KpiDataEntry
          ]),
          CommonModule
        ],
  controllers: [KpiDataEntryController],
  providers: [KpiDataEntryService],
})
export class KpiDataEntryModule {}
