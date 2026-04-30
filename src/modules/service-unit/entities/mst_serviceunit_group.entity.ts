import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { MstServiceUnit } from './mst_serviceunit.entity';
@Entity({ name: 'mst_service_units_group' })
export class MstServiceUnitGroup {
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

  @OneToMany(() => MstServiceUnit, (serviceunit) => serviceunit.serviceUnitGroup)
  serviceUnits?: MstServiceUnit[];


}