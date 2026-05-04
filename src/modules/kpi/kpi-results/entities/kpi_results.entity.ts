import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';


import { KpiDirectory } from '../../kpi-directory/entities/kpi_directory.entity';
import { UserSystem } from '../../../users/entities/users.entity';

@Entity({ name: 'kpi_results' })
@Unique(['kpiRefId', 'year', 'periodNo'])
export class KpiResults {
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
  // PERIOD
  // =========================
  @Column({ type: 'int' })
  year!: number;
  @Column({ name: 'period_no', type: 'int' })
  periodNo!: number;
  @Column({ name: 'month', type: 'int' })
  month!: number;
  // =========================
  // RAW DATA
  // =========================
  @Column({ name: 'numerator_value', type: 'decimal', nullable: true })
  numeratorValue?: number;

  @Column({ name: 'denominator_value', type: 'decimal', nullable: true })
  denominatorValue?: number;

  // =========================
  // FINAL VALUE
  // =========================
  @Column({ type: 'decimal', nullable: true })
  value?: number;

  // =========================
  // AUDIT
  // =========================
  @Column({ name: 'created_by_ref_id' })
  createdByRefId!: number;

  @ManyToOne(() => UserSystem, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by_ref_id' })
  creator!: UserSystem;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  updatedAt!: Date;
}