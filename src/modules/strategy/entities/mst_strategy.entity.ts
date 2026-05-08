import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import {MstStrategyGroup} from './mst_strategy_group.entity'
@Entity({ name: 'mst_strategy' })
@Index(['code', 'mst_strategy_group_id'], { unique: true }) 
export class MstStrategy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
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
  mst_strategy_group_id!: number;

  @ManyToOne(() => MstStrategyGroup, (group) => group.strategies, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'mst_strategy_group_id' })
  strategyGroup!: MstStrategyGroup;
}