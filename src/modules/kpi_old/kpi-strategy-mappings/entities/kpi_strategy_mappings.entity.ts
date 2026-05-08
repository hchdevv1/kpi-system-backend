import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import {KpiDirectory} from '../../kpi-directory/entities/kpi-directory.entity';
import { MstStrategy } from '../../../strategy/entities/mst_strategy.entity';

@Entity({ name: 'kpi_strategy_mappings' })
export class KpiStrategyMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'kpi_id' })
  kpiId!: number;

  @ManyToOne(() => KpiDirectory, (kpi) => kpi.kpiStrategies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDirectory;

  @Column({ name: 'strategy_id' })
  strategyId!: number;

  @ManyToOne(() => MstStrategy, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'strategy_id' })
  strategy!: MstStrategy;
}