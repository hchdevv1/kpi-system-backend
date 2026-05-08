import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MstStrategy } from './entities/mst_strategy.entity';
import { MstStrategyGroup } from './entities/mst_strategy_group.entity';
import { CommonModule } from '../../common/common.module';


@Module({
   imports: [
    TypeOrmModule.forFeature([
      MstStrategy,
      MstStrategyGroup,
    ]),
    CommonModule
  ],
  controllers: [StrategyController],
  providers: [StrategyService],
})
export class StrategyModule {}
