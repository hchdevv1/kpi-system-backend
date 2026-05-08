import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { KpiDefinition} from '../../kpi-definition/entities/kpi-definition.entity';
import { UserSystem } from '../../../users/entities/users.entity';
import { MstKpiRoles } from '../../../roles/entities/utils_kpi_roles.entity';

@Entity({ name: 'kpi_user_roles_mappings' })
@Index(['kpiId'])
@Index(['userId'])
@Index(['roleId'])
@Index(['kpiId', 'userId', 'roleId'], { unique: true })
export class KpiUserRolesMappings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'kpi_id' })
  kpiId!: number;

  @ManyToOne(() => KpiDefinition, (kpi) => kpi.userRoles)
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDefinition;


  @Column({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => UserSystem)
  @JoinColumn({ name: 'user_id' })
  user!: UserSystem;

  @Column({ name: 'role_id' })
  roleId!: number;

  @ManyToOne(() => MstKpiRoles)
  @JoinColumn({ name: 'role_id' })
  role!: MstKpiRoles;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
}