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

import { MstTopic } from '../../../topic/entities/mst_topic.entity';
import { MstMeasure } from '../../../measure-category/entities/mst_measure.entity';
import { MstConditionOperator } from '../../../condition-operator/entities/mst_condition_operator.entity';
import { MstUnit } from '../../../unit/entities/mst_kpi_unit.entity';
import { MstFrequency } from '../../../frequency/entities/mst_frequency.entity';
import { MstBenchmark } from '../../../benchmark/entities/mst_benchmark.entity';

import { KpiServiceUnitsMappings } from '../../kpi-service-unit-mappings/entities/kpi_service_units_mappings.entity';
import { KpiSimpleMappings } from '../../kpi-simple-mappings/entities/kpi_simple_mappings.entity';
import { KpiUserRolesMappings } from '../../kpi-user-roles-mappings/entities/kpi_user_roles_mappings.entity';
import { KpiStrategyMappings } from '../../kpi-strategy-mappings/entities/kpi_strategy_mappings.entity';
import { KpiOrganizationMappings } from '../../kpi-organization-mappings/entities/kpi_organization_mappings.entity';

@Entity({ name: 'kpi_definition' })
@Index('uq_kpi_topic_year', ['topic_ref_id', 'kpi_year'], { unique: true })
export class KpiDefinition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'topic_ref_id' })
  topic_ref_id!: number;

  @ManyToOne(() => MstTopic, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'topic_ref_id' })
  topic!: MstTopic;

  @Column({ name: 'kpi_year', type: 'int' })
  kpi_year!: number;

  @Column({ name: 'kpi_start_date', type: 'date', nullable: true })
  kpiStartDate?: string;

  @Column({ name: 'measure_ref_id', nullable: true })
  measureRefId?: number;

  @ManyToOne(() => MstMeasure, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'measure_ref_id' })
  measureCategory?: MstMeasure;

  @Column({ name: 'frequency_ref_id' })
  frequencyRefId!: number;

  @ManyToOne(() => MstFrequency, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'frequency_ref_id' })
  frequency!: MstFrequency;

  @Column({ name: 'unit_ref_id' })
  unitRefId!: number;

  @ManyToOne(() => MstUnit, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'unit_ref_id' })
  unit!: MstUnit;

  @Column({ name: 'condition_operator_ref_id', nullable: true })
  conditionOperatorRefId?: number;

  @ManyToOne(() => MstConditionOperator, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'condition_operator_ref_id' })
  conditionOperator?: MstConditionOperator;

  @Column({ name: 'benchmark_ref_id', nullable: true })
  benchmarkRefId?: number;

  @ManyToOne(() => MstBenchmark, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'benchmark_ref_id' })
  benchmark?: MstBenchmark;

  @Column({ name: 'benchmark_target_value', type: 'double precision', nullable: true })
  benchmark_target_value?: number;

  @Column({ name: 'numerator', type: 'text', nullable: true })
  numerator?: string;

  @Column({ name: 'denominator', type: 'text', nullable: true })
  denominator?: string;

  @Column({ name: 'multiplier', type: 'double precision', nullable: true })
  multiplier?: number;

  @Column({ name: 'target_value', type: 'double precision', nullable: true })
  targetValue?: number;

  @Column({ name: 'previous_year_value', type: 'double precision', nullable: true })
  previousYearValue?: number;

  @OneToMany(() => KpiStrategyMappings, (s) => s.kpi)
  kpiStrategies?: KpiStrategyMappings[];

  @OneToMany(() => KpiOrganizationMappings, (orgMap) => orgMap.kpi)
  kpiOrganizations?: KpiOrganizationMappings[];

  // ✅ FIX naming
  @OneToMany(() => KpiServiceUnitsMappings, (su) => su.kpi)
  kpiServiceUnits?: KpiServiceUnitsMappings[];


  @OneToMany(() => KpiSimpleMappings, (s) => s.kpi)
  kpiSimples?: KpiSimpleMappings[];

  @OneToMany(() => KpiUserRolesMappings, (userRole) => userRole.kpi)
  userRoles?: KpiUserRolesMappings[];

  @Column({ name: 'is_active', type: 'boolean', default: true })
  is_active!: boolean;

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

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deleted_at?: Date | null;
}