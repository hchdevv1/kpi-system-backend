import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';
import { UserSystem } from '../../../users/entities/users.entity';

@Entity({ name: 'kpi_data_entry' })

// 1 KPI + 1 Month + 1 Year = 1 Record
@Index(
  'uq_kpi_data_entry_period',
  ['kpiDefinitionId', 'kpiDefYear', 'kpiDefMonth'],
  { unique: true },
)

@Index(['kpiDefinitionId'])
@Index(['kpiDefYear'])
@Index(['kpiDefMonth'])
@Index(['updatedBy']) // เพิ่ม
export class KpiDataEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  // =========================
  // KPI Definition
  // =========================

  @Column({ name: 'kpi_definition_id' })
  kpiDefinitionId!: number;

  @ManyToOne(() => KpiDefinition, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kpi_definition_id' })
  kpiDefinition!: KpiDefinition;

  // =========================
  // Period
  // =========================

  @Column({
    name: 'kpi_def_year',
    type: 'int',
  })
  kpiDefYear!: number;

  // 1-12
  @Column({
    name: 'kpi_def_month',
    type: 'int',
  })
  kpiDefMonth!: number;

  // =========================
  // Raw KPI Values
  // =========================

  @Column({
    name: 'numerator_value',
    type: 'double precision',
  })
  numeratorValue!: number;

  @Column({
    name: 'denominator_value',
    type: 'double precision',
    nullable: true,
  })
  denominatorValue?: number;

  // =========================
  // Audit User
  // =========================

  @Column({
    name: 'created_by',
    nullable: true,
  })
  createdBy?: number;

  @ManyToOne(() => UserSystem, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'created_by' })
  createdByUser?: UserSystem;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy?: number;

  @ManyToOne(() => UserSystem, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'updated_by' })
  updatedByUser?: UserSystem;

  // =========================
  // Audit Date
  // =========================

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  updated_at!: Date;
}