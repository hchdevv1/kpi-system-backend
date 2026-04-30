import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KpiSimpleService } from './kpi-simple.service';
import { KpiSimpleController } from './kpi-simple.controller';
import { MstSimpleGroup } from './entities/mst_simple_group.entity'
import { MstSimple } from './entities/mst_simple.entity';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MstSimpleGroup, MstSimple
    ]),
    CommonModule
  ],
  controllers: [KpiSimpleController],
  providers: [KpiSimpleService],
})
export class KpiSimpleModule { }
