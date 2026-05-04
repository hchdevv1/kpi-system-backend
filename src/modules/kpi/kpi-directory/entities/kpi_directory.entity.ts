import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { MstTopic } from '../../../kpi-topic/entities/mst_topic.entity';
import { MstStrategy } from '../../../strategy/entities/mst_strategy.entity';
import { MstOrganization } from '../../../organization/entities/mst_organization.entity';
import { MstMeasure } from '../../../measure-category/entities/mst_measure.entity';

import { MstConditionOperator } from '../../../condition-operator/entities/mst_condition_operator.entity';
import { MstUnit } from '../../../kpi-unit/entities/mst_kpi_unit.entity';
import { MstFrequency } from '../../../frequency/entities/mst_frequency.entity';
import { MstBenchmark } from '../../../kpi-benchmark/entities/mst_benchmark.entity';

import { KpiServiceUnits } from '../../kpi_service_units/entities/kpi_service_units.entity';
import { KpiSimpleMappings } from '../../kpi_simple_mappings/entities/kpi_simple_mappings.entity';
import { KpiUserRoles } from '../../kpi-user-roles/entities/kpi_user_roles.entity';
@Entity({ name: 'kpi_directory' })
@Index('idx_kpi_directory_topic_year', ['topicRefId', 'year'])
export class KpiDirectory {
  @PrimaryGeneratedColumn()
  id!: number;

  // =========================
  // CORE
  // =========================

  @Column({ name: 'topic_ref_id' })
  topicRefId!: number;

  @ManyToOne(() => MstTopic, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'topic_ref_id' })
  topic!: MstTopic;

  @Column({ type: 'int' })
  year!: number;
  @Column({ name: 'kpi_start_date', type: 'date', nullable: true })
  kpiStartDate?: string;
  // =========================
  // CONTEXT
  // =========================

  @Column({ name: 'strategy_ref_id', nullable: true })
  strategyRefId?: number;

  @ManyToOne(() => MstStrategy, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'strategy_ref_id' })
  strategy?: MstStrategy;

  @Column({ name: 'org_ref_id', nullable: true })
  organizationRefId?: number;

  @ManyToOne(() => MstOrganization, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'org_ref_id' })
  organization?: MstOrganization;

  @Column({ name: 'measure_ref_id', nullable: true })
  measureRefId?: number;

  @ManyToOne(() => MstMeasure, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'measure_ref_id' })
  measureCategory?: MstMeasure;

  // =========================
  // CONFIG
  // =========================

  // Frequency
  @Column({ name: 'frequency_ref_id' })
  frequencyRefId!: number;

  @ManyToOne(() => MstFrequency, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'frequency_ref_id' })
  frequency!: MstFrequency;

  // Unit
  @Column({ name: 'unit_ref_id' })
  unitRefId!: number;

  @ManyToOne(() => MstUnit, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'unit_ref_id' })
  unit!: MstUnit;

  // 🔥 Condition Operator (NEW)
  @Column({ name: 'condition_operator_ref_id', nullable: true })
  conditionOperatorRefId?: number;

  @ManyToOne(() => MstConditionOperator, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'condition_operator_ref_id' })
  conditionOperator?: MstConditionOperator;

  // Benchmark
  @Column({ name: 'benchmark_ref_id', nullable: true })
  benchmarkRefId?: number;

  @ManyToOne(() => MstBenchmark, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'benchmark_ref_id' })
  benchmark?: MstBenchmark;

  // =========================
  // FORMULA
  // =========================

  @Column({ type: 'text', nullable: true })
  numerator?: string;

  @Column({ type: 'text', nullable: true })
  denominator?: string;

  @Column({ type: 'decimal', nullable: true })
  multiplier?: number;

  // =========================
  // TARGET
  // =========================

  @Column({ type: 'decimal', nullable: true })
  targetValue?: number;

  @Column({ type: 'decimal', nullable: true })
  previousYearValue?: number;

  // =========================
  // RELATIONS (DYNAMIC)
  // =========================

  @OneToMany(
    () => KpiServiceUnits,
    (su: KpiServiceUnits) => su.kpi,
    { cascade: true },
  )
  serviceUnits?: KpiServiceUnits[];

  @OneToMany(
    () => KpiSimpleMappings,
    (s: KpiSimpleMappings) => s.kpi,
    { cascade: true },
  )
  simpleMappings?: KpiSimpleMappings[];
  @OneToMany(
    () => KpiUserRoles,
    (userRole) => userRole.kpi,
  )
  userRoles?: KpiUserRoles[];
  // =========================
  // AUDIT
  // =========================

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;


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

  @Column({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())", nullable: true
  })
  deletedAt?: Date | null;
}