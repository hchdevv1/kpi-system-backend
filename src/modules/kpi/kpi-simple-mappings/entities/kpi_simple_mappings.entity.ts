import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';

import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';
import { MstSimple } from '../../../simple/entities/mst_simple.entity';

@Entity({ name: 'kpi_simple_mappings' })

// ✅ FIX index + unique
@Index(['kpiId'])
@Index(['simpleId'])
@Index(['kpiId', 'simpleId'], { unique: true })
export class KpiSimpleMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  // ✅ FIX naming
  @Column({ name: 'kpi_id' })
  kpiId!: number;

  // ✅ FIX inverse relation
  @ManyToOne(() => KpiDefinition, (kpi) => kpi.kpiSimples, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDefinition;

  // ✅ FIX naming
  @Column({ name: 'simple_id' })
  simpleId!: number;

  @ManyToOne(() => MstSimple, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'simple_id' })
  simple!: MstSimple;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
}