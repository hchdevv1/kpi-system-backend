import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

import { KpiDefinition } from '../../kpi-definition/entities/kpi-definition.entity';
import { MstOrganization } from '../../../organization/entities/mst_organization.entity';

@Entity({ name: 'kpi_organization_mappings' })

@Index(['kpiId'])
@Index(['organizationId'])
@Index(['kpiId', 'organizationId'], { unique: true })
export class KpiOrganizationMappings {
  @PrimaryGeneratedColumn()
  id!: number;


  @Column({ name: 'kpi_id' })
  kpiId!: number;

  @ManyToOne(() => KpiDefinition, (kpi) => kpi.kpiOrganizations)
  @JoinColumn({ name: 'kpi_id' })
  kpi!: KpiDefinition;


  @Column({ name: 'organization_id' })
  organizationId!: number;

  @ManyToOne(() => MstOrganization)
  @JoinColumn({ name: 'organization_id' })
  organization!: MstOrganization;


  @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;
}