import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
@Entity({ name: 'mst_kpi_roles' })
export class MstKpiRoles {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 10 })
  code!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;


}