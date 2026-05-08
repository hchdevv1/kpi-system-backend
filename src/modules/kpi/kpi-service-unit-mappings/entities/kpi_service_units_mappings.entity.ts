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
import { MstServiceUnit } from '../../../service-unit/entities/mst_serviceunit.entity';

@Entity({ name: 'kpi_service_units_mappings' })

// ✅ FIX index + unique
@Index(['kpiId'])
@Index(['serviceUnitId'])
@Index(['kpiId', 'serviceUnitId'], { unique: true })
export class KpiServiceUnitsMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  // ✅ FIX naming
  @Column({ name: 'kpi_id' })
  kpiId!: number;

  // ✅ FIX inverse relation
  @ManyToOne(() => KpiDefinition, (kpi) => kpi.kpiServiceUnits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDefinition;

  // ✅ FIX naming
  @Column({ name: 'service_unit_id' })
  serviceUnitId!: number;

  @ManyToOne(() => MstServiceUnit, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'service_unit_id' })
  serviceUnit!: MstServiceUnit;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
}