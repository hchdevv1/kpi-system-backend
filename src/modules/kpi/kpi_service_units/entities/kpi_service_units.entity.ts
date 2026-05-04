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
import { MstServiceUnit } from '../../../service-unit/entities/mst_serviceunit.entity';

@Entity({ name: 'kpi_service_units' })
@Unique(['kpiRefId', 'serviceUnitRefId']) // กัน duplicate
export class KpiServiceUnits {
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
  // FK: SERVICE UNIT
  // =========================
  @Column({ name: 'service_unit_ref_id' })
  serviceUnitRefId!: number;

  @ManyToOne(() => MstServiceUnit, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_unit_ref_id' })
  serviceUnit!: MstServiceUnit;

  // =========================
  // AUDIT
  // =========================
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  createdAt!: Date;
}