import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';
import { MstStrategy } from '../../../strategy/entities/mst_strategy.entity';

@Entity({ name: 'kpi_strategy_mappings' })

// ✅ FIX: index + unique
@Index(['kpiId'])
@Index(['strategyId'])
@Index(['kpiId', 'strategyId'], { unique: true })
export class KpiStrategyMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'kpi_id' })
  kpiId!: number;

  @ManyToOne(() => KpiDefinition, (kpi) => kpi.kpiStrategies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDefinition;

  @Column({ name: 'strategy_id' })
  strategyId!: number;

  @ManyToOne(() => MstStrategy, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'strategy_id' })
  strategy!: MstStrategy;

  // ✅ FIX: audit field (ให้เหมือนตัวอื่น)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
}