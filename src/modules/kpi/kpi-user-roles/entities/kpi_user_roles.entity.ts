import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

import { KpiDirectory } from '../../kpi-directory/entities/kpi_directory.entity';
import { UserSystem } from '../../../users/entities/users.entity';
import { MstKpiRoles } from '../../../roles/entities/utils_kpi_roles.entity';

@Entity({ name: 'kpi_user_roles' })
@Unique(['kpiRefId', 'userRefId', 'roleRefId'])
export class KpiUserRoles {
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
  // FK: USER
  // =========================
  @Column({ name: 'user_ref_id' })
  userRefId!: number;

  @ManyToOne(() => UserSystem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_ref_id' })
  user!: UserSystem;

  // =========================
  // FK: ROLE
  // =========================
  @Column({ name: 'role_ref_id' })
  roleRefId!: number;

  @ManyToOne(() => MstKpiRoles, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'role_ref_id' })
  role!: MstKpiRoles;

  // =========================
  // AUDIT
  // =========================
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  createdAt!: Date;
}