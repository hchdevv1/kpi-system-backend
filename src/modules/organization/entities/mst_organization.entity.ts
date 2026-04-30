import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {MstOrganizationGroup} from './mst_organization_group.entity'

@Entity({ name: 'mst_organization' })
@Index(['code', 'mst_organization_group_id'], { unique: true }) 
export class MstOrganization {

   @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @CreateDateColumn({
  type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @Column()
  mst_organization_group_id!: number;

  @ManyToOne(() => MstOrganizationGroup, (group) => group.organizations, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    })
  @JoinColumn({ name: 'mst_organization_group_id' })
  organizationGroup!: MstOrganizationGroup;

}