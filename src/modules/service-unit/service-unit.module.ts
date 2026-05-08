import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceUnitService } from './service-unit.service';
import { ServiceUnitController } from './service-unit.controller';
import { MstServiceUnitGroup } from './entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from './entities/mst_serviceunit.entity';

import { CommonModule } from '../../common/common.module';

@Module({
    imports: [
                TypeOrmModule.forFeature([
                  MstServiceUnitGroup,MstServiceUnit
                ]),
               CommonModule
              ],
  controllers: [ServiceUnitController],
  providers: [ServiceUnitService],
})
export class ServiceUnitModule { }
