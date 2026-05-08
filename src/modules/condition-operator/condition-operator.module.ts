import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConditionOperatorService } from './condition-operator.service';
import { ConditionOperatorController } from './condition-operator.controller';
import { MstConditionOperator } from './entities/mst_condition_operator.entity';
import { CommonModule } from '../../common/common.module';

@Module({
   imports: [
              TypeOrmModule.forFeature([
                MstConditionOperator,
              ]),
             CommonModule
            ],
  controllers: [ConditionOperatorController],
  providers: [ConditionOperatorService],
})
export class ConditionOperatorModule { }
