import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {MstSimpleGroup} from './mst_simple_group.entity';

@Entity({ name: 'mst_simple' })
@Index(['code', 'simple_group_id'], { unique: true }) 
export class MstSimple {

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
  simple_group_id!: number;

  @ManyToOne(() => MstSimpleGroup, (group) => group.kpisimples, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    })
  @JoinColumn({ name: 'simple_group_id' })
  kpisimplegroup!: MstSimpleGroup;

}