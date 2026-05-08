import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { MstOrganization} from './mst_organization.entity';
@Entity({ name: 'mst_organization_group' })
export class MstOrganizationGroup {
  @PrimaryGeneratedColumn()
  id!: number;


  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

   @CreateDateColumn({
    type: 'timestamptz',
    default: () => "timezone('Asia/Bangkok', now())",
  })
  created_at!: Date;


  @OneToMany(() => MstOrganization, (organization) => organization.organizationGroup)
  organizations?: MstOrganization[];
}