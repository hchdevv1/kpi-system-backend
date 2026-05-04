import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';

import { KpiDirectory } from '../../kpi-directory/entities/kpi_directory.entity';
import { MstSimple } from '../../../kpi-simple/entities/mst_simple.entity';

@Entity({ name: 'kpi_simple_mappings' })
@Unique(['kpiRefId', 'simpleRefId']) // กัน duplicate mapping
export class KpiSimpleMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  // =========================
  // FK: KPI
  // =========================
  @Column({ name: 'kpi_ref_id' })
  kpiRefId!: number;

  @ManyToOne(() => KpiDirectory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'kpi_ref_id' })
  kpi!: KpiDirectory;

  // =========================
  // FK: SIMPLE
  // =========================
  @Column({ name: 'simple_ref_id' })
  simpleRefId!: number;

  @ManyToOne(() => MstSimple, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'simple_ref_id' })
  simple!: MstSimple;

  // =========================
  // AUDIT
  // =========================
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  createdAt!: Date;
}