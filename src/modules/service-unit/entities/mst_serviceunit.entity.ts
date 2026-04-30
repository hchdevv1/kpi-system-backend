import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {MstServiceUnitGroup} from './mst_serviceunit_group.entity'

@Entity({ name: 'mst_service_units' })
@Index(['code', 'service_unit_group_id'], { unique: true }) 
export class MstServiceUnit {

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
  service_unit_group_id!: number;

  @ManyToOne(() => MstServiceUnitGroup, (group) => group.serviceUnits, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    })
  @JoinColumn({ name: 'service_unit_group_id' })
  serviceUnitGroup!: MstServiceUnitGroup;

}